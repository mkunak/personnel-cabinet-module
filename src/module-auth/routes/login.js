const { Router } = require("express");
const { compare } = require("bcryptjs");

// const getDictionary = require("../../dictionaries");

const { upload } = require("../../api/multer");

const { User } = require("../models");

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/auth/login", {
    title: "[Login]",
    isLoginRegister: true,
    isLoggedIn: false,
    // isLoggedIn: JSON.stringify(req.session.isLoggedIn),
  });
});

router.post("/", upload.any(), async (req, res) => {
  try {
    // const { urlPrefixLanguage } = res.locals;
    // const { warnings, successes } = getDictionary(urlPrefixLanguage);
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      req.flash("warning", "Wrong email.");
      return res.send({
        messageType: "warning",
        message: "Wrong email.",
      });
    }

    if (!foundUser.isConfirmed) {
      req.flash(
        "warning",
        "The email was not confirmed. Start register from the beginning.",
      );
      await User.findOneAndDelete({ email });
      return res.send({
        messageType: "warning",
        message: "The email was not confirmed. Start register from the beginning.",
      });
    }

    if (!foundUser.isRegistered) {
      req.flash(
        "warning",
        "Account was not registered. Start register from the beginning.",
      );
      await User.findOneAndDelete({ email });
      return res.send({
        messageType: "warning",
        message: "Account was not registered. Start register from the beginning.",
      });
    }

    const isMatched = await compare(password, foundUser.password);
    if (!isMatched) {
      req.flash("warning", "Wrong password.");
      return res.send({
        messageType: "warning",
        message: "Wrong password.",
      });
    }

    req.session.user = foundUser;
    if (
      foundUser.email === "aleksandr.kalinichenko16@gmail.com" ||
      foundUser.email === "kunak.test@gmail.com"
    ) {
      req.session.isAdmin = true;
    }
    req.session.isLoggedIn = true;
    req.flash("success", "Login success.");
    req.session.save((err) => {
      if (err) throw err;
      return res.send({
        messageType: "success",
        message: "Login success.",
      });
    });
  } catch (error) {
    console.log(`>>> Login error: ${error}`);
  }
});

module.exports = router;
