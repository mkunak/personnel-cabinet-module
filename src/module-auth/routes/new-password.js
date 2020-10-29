require("dotenv").config();
// const crypto = require("crypto");
const { Router } = require("express");
const { hash, compare } = require("bcryptjs");
const { createTransport } = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

const { upload } = require("../../api/multer");
const getDictionary = require("../../dictionaries");
const newPswdSuccessMail = require("../mailings/new-password-success");

const { checkAuth } = require("../middlewares");

const { User } = require("../models");

const router = Router();
const transporter = createTransport(sendgrid({
  auth: { api_key: process.env.SENDGRID_API_KEY },
}));

router.get("/:token", async (req, res) => {
  try {
    const { urlPrefixLanguage } = res.locals;
    const { warnings } = getDictionary(urlPrefixLanguage);
    const { token } = req.params;

    if (!token) return res.redirect("/login");

    const foundUser = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date(Date.now()) },
    });

    if (!foundUser) {
      req.flash("warning", warnings.newPassword.tokenHasExpired);
      return res.redirect("/login");
    }

    const warning = req.flash("warning");

    res.render("pages/auth/new-password", {
      title: "[New password]",
      isNewPassword: true,
      urlPrefixLanguage,
      userId: foundUser._id.toString(),
      token,
      warning,
    });
  } catch (error) {
    console.log(`>>> New password error: ${error}`);
  }
});

router.post("/:token", upload.any(), async (req, res) => {
  try {
    const { urlPrefixLanguage } = res.locals;
    const { warnings, successes } = getDictionary(urlPrefixLanguage);
    const {
      token,
      userId,
      new_password,
      new_password_repeat,
    } = req.body;

    const foundUser = await User.findOne({
      _id: userId,
      resetToken: token,
      resetTokenExpires: { $gt: new Date(Date.now()) },
    });

    if (!foundUser) {
      req.flash("warning", warnings.newPassword.tokenHasExpired);
      return res.send({
        message: warnings.newPassword.tokenHasExpired,
        messageType: "warning",
      });
    }

    // console.log(">>>", warnings.newPassword.passwordMismatch);

    const hashedPassword = await hash(new_password, 12);
    const isMatched = await compare(new_password_repeat, hashedPassword);
    if (!isMatched) {
      req.flash("warning", warnings.newPassword.passwordMismatch);
      console.log(">>>", warnings.newPassword.passwordMismatch);
      return res.send({
        message: warnings.newPassword.passwordMismatch,
        messageType: "warning",
      });
    }

    foundUser.password = hashedPassword;
    foundUser.resetToken = "";
    foundUser.resetTokenExpires = null;
    foundUser.changed = new Date(Date.now());
    await foundUser.save();

    req.flash("success", successes.newPassword.succeeded);
    await transporter.sendMail(newPswdSuccessMail(foundUser.email));

    res.send({
      message: successes.newPassword.succeeded,
      messageType: "success",
    });
  } catch (error) {
    console.log(`>>> New password error: ${error}`);
  }
});

router.post("/from/profile", upload.any(), checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { urlPrefixLanguage } = res.locals;
    const { warnings, successes } = getDictionary(urlPrefixLanguage);
    const { oldPassword, newPassword, newPasswordRepeat } = req.body;

    const foundUser = await User.findOne({ _id: userId });
    const isOldPasswordCorrect = await compare(oldPassword, foundUser.password);
    if (!isOldPasswordCorrect) {
      req.flash("warning", warnings.newPassword.userNotFound);
      return res.send({
        message: warnings.newPassword.userNotFound,
        messageType: "warning",
      });
    }

    const hashedNewPassword = await hash(newPassword, 12);
    const isMatched = await compare(newPasswordRepeat, hashedNewPassword);
    if (!isMatched) {
      req.flash("warning", warnings.newPassword.passwordMismatch);
      return res.send({
        message: warnings.newPassword.passwordMismatch,
        messageType: "warning",
      });
    }

    foundUser.password = hashedNewPassword;
    foundUser.changed = `${Date.now()}`;
    await foundUser.save();
    req.flash("success", successes.newPassword.succeeded);
    await transporter.sendMail(newPswdSuccessMail(foundUser.email));

    res.send({
      isLoggedIn: req.session.isLoggedIn,
      urlPrefixLanguage,
      message: successes.newPassword.succeeded,
      messageType: "success",
    });
  } catch (error) {
    console.log(`>>> New password error: ${error}`);
  }
});

module.exports = router;
