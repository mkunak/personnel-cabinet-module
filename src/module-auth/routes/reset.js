require("dotenv").config();
const crypto = require("crypto");
const { Router } = require("express");
const { createTransport } = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

const { upload } = require("../../api/multer");
const getDictionary = require("../../dictionaries");
const newPswdConfirmMail = require("../mailings/new-password-confirm");

const { User } = require("../models");

const router = Router();
const transporter = createTransport(
  sendgrid({
    auth: { api_key: process.env.SENDGRID_API_KEY },
  }),
);

router.get("/", (req, res) => {
  res.render("pages/auth/reset", {
    title: "[Reset]",
    isReset: true,
    // isLoggedIn: JSON.stringify(req.session.isLoggedIn),
  });
});

router.post("/", upload.any(), (req, res) => {
  try {
    const { urlPrefixLanguage } = res.locals;
    const { warnings, errors, successes } = getDictionary(urlPrefixLanguage);
    const { email } = req.body;

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash("error", errors.reset.repeatLater);
        return res.send({
          message: errors.reset.repeatLater,
          messageType: "error",
        });
      }

      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        req.flash("warning", warnings.reset.userNotFound);
        return res.send({
          message: warnings.reset.userNotFound,
          messageType: "warning",
        });
      }

      const token = buffer.toString("hex");
      foundUser.resetToken = token;
      foundUser.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 5);
      await foundUser.save();
      await transporter.sendMail(newPswdConfirmMail(email, token));
      res.send({
        message: successes.reset.succeeded,
        messageType: "success",
      });
    });
  } catch (error) {
    console.log(`>>> Reset password error: ${error}`);
  }
});

module.exports = router;
