require("dotenv").config();
// const crypto = require("crypto");
const { Router } = require("express");
const { hash, compare } = require("bcryptjs");
const { createTransport } = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const generateDigitalCode = require("../../helpers/generate-digital-code");

const { User } = require("../models");
// const { getGoogleUrl } = require("../auth-api/google");
// const { getFacebookUrl } = require("../auth-api/facebook");
const getDictionary = require("../../dictionaries");
const { upload } = require("../../api/multer");
const codeConfirmMail = require("../mailings/code-confirm");
// const codeSuccessMail = require("../mailings/code-success");
// const registerConfirmMail = require("../mailings/registration-confirm");
// const registerSuccessMail = require("../mailings/registration-success");
// const registerExpiredMail = require("../mailings/registration-expired");

// const checkInverseAuth = require("../middlewares/auth/check-inverse-auth");
const { checkRegister2, checkRegister3 } = require("../middlewares");

// const { getRegisterLinksData } = require("../../mock-data");
// const loadDataToDB = require("../../helpers/load-data-to-db");
const {
  validateEmail,
  validatePassword,
  validateConfirmCode,
  validateName,
  validateDate,
  validatePhone,
  validateOther,
} = require("../../helpers/validate");

const router = Router();
const transporter = createTransport(
  sendgrid({
    auth: { api_key: process.env.SENDGRID_API_KEY },
  }),
);

// router.get('/', checkInverseAuth, (req, res) => {
router.get("/", (req, res) => {
  const { urlPrefixLanguage } = res.locals;
  const success = req.flash("success");
  res.render("pages/auth/register-step-1", {
    title: "GS App [Register. Step 1]",
    isLoginRegister: true,
    urlPrefixLanguage,
    success,
  });
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const { urlPrefixLanguage } = res.locals;
    const { warnings, successes } = getDictionary(urlPrefixLanguage);
    const { email, password, password_repeat } = req.body;

    if (!validateEmail(email)) {
      req.flash("warning", warnings.register.emailWrong);
      return res.send({
        message: warnings.register.emailWrong,
        messageType: "validation",
      });
    }

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      req.flash("warning", warnings.register.emailWrong);
      return res.send({
        message: warnings.register.emailWrong,
        messageType: "warning",
      });
    }

    if (!password || !password_repeat) {
      req.flash("warning", warnings.register.passwordWrong);
      return res.send({
        message: warnings.register.noPassword,
        messageType: "warning",
      });
    }

    const hashedPassword = await hash(password, 12);
    const isMatched = await compare(password_repeat, hashedPassword);
    if (!isMatched) {
      req.flash("warning", warnings.register.passwordWrong);
      return res.send({
        message: warnings.register.passwordWrong,
        messageType: "warning",
      });
    }

    if (!validatePassword(password)) {
      req.flash("warning", warnings.register.passwordWrong);
      return res.send({
        message: warnings.register.passwordWrong,
        messageType: "validation",
      });
    }

    const confirmCode = generateDigitalCode();

    const user = new User({
      email,
      password: hashedPassword,
      isConfirmed: false,
      isRegistered: false,
      confirmCode,
      confirmCodeExpires: new Date(Date.now() + 1000 * 60 * 60),
      created: `${Date.now()}`,
      changed: `${Date.now()}`,
    });
    await user.save();

    await transporter.sendMail(codeConfirmMail(email, confirmCode));
    req.flash("success", successes.register.confirmCode);
    req.session.user = user;
    req.session.register2 = true;
    req.session.save((err) => {
      if (err) throw err;
      return res.send({
        message: successes.register.confirmCode,
        messageType: "success",
      });
    });
  } catch (error) {
    console.log(`>>> Error /register/1: ${error}`);
  }
});

router.get("/2", checkRegister2, (req, res) => {
  const { urlPrefixLanguage } = res.locals;
  const success = req.flash("success");
  res.render("pages/auth/register-step-2", {
    title: "GS App [Register > Step 2]",
    isLoginRegister: true,
    success,
    urlPrefixLanguage,
  });
});

router.post("/2", checkRegister2, upload.any(), async (req, res) => {
  try {
    // const { urlPrefixLanguage } = res.locals;
    // const { warnings, successes } = getDictionary(urlPrefixLanguage);
    const { confirmCode } = req.body;

    if (!validateConfirmCode(confirmCode)) {
      req.flash("warning", "Confirmation code is not valid.");
      return res.send({
        message: "Confirmation code is not valid.",
        messageType: "validation",
      });
    }

    const foundUser = await User.findOne({ confirmCode });

    if (!foundUser) {
      req.flash("warning", "Wrong code.");
      return res.send({
        message: "Wrong code.",
        messageType: "warning",
      });
    }

    const { _id, confirmCodeExpires } = foundUser;

    if (confirmCodeExpires < Date.now()) {
      req.flash(
        "warning",
        "Code has expired. Start register from the beginning. Account data removed.",
      );
      await User.findOneAndDelete({ _id, confirmCode });
      req.session.destroy();
      return res.send({
        message:
          "Code has expired. Start register from the beginning. Account data removed.",
        messageType: "warning",
      });
    }

    await User.findOneAndUpdate(
      { _id },
      {
        rates: [0],
        points: {
          green: 0,
          red: 0,
        },
        isConfirmed: true,
        isRegistered: false,
        confirmCode: "",
        confirmCodeExpires: null,
        changed: `${Date.now()}`,
      },
    );

    req.flash("success", "Code is confirmed. Account is created.");

    req.session.user = foundUser;
    req.session.register3 = true;
    req.session.save((err) => {
      if (err) throw err;
      return res.send({
        message: "Code is confirmed. Account is created.",
        messageType: "success",
      });
    });
  } catch (error) {
    console.log(`>>> Error /register/2: ${error}`);
  }
});

router.get("/3", checkRegister3, (req, res) => {
  const { urlPrefixLanguage } = res.locals;
  const success = req.flash("success");
  res.render("pages/auth/register-step-3", {
    title: "GS App [Register > Step 3]",
    isLoginRegister: true,
    success,
    urlPrefixLanguage,
  });
});

router.post("/3", checkRegister3, upload.any(), async (req, res) => {
  try {
    const { urlPrefixLanguage } = res.locals;
    const { warnings } = getDictionary(urlPrefixLanguage);
    const {
      phone,
      skype,
      discort,
      telegram,
      position,
      birthday,
      lastName,
      firstName,
    } = req.body;

    if (!validateName(firstName)) {
      req.flash("warning", "First name is not valid.");
      return res.send({
        message: "First name is not valid.",
        messageType: "validation",
      });
    }

    if (!validateName(lastName)) {
      req.flash("warning", "Last name is not valid.");
      return res.send({
        message: "Last name is not valid.",
        messageType: "validation",
      });
    }

    if (!validateDate(birthday)) {
      req.flash("warning", "Date is not valid.");
      return res.send({
        message: "Date is not valid.",
        messageType: "validation",
      });
    }

    if (!validatePhone(phone)) {
      req.flash("warning", "Phone is not valid.");
      return res.send({
        message: "Phone is not valid.",
        messageType: "validation",
      });
    }

    if (!validateOther(position)) {
      req.flash("warning", "Position is not valid.");
      return res.send({
        message: "Position is not valid.",
        messageType: "validation",
      });
    }
    if (!validateOther(skype)) {
      req.flash("warning", "Skype is not valid.");
      return res.send({
        message: "Skype is not valid.",
        messageType: "validation",
      });
    }
    if (!validateOther(telegram)) {
      req.flash("warning", "Telegram is not valid.");
      return res.send({
        message: "Telegram is not valid.",
        messageType: "validation",
      });
    }
    if (!validateOther(discort)) {
      req.flash("warning", "Discort is not valid.");
      return res.send({
        message: "Discort is not valid.",
        messageType: "validation",
      });
    }

    const userData = {
      rates: [0],
      points: {
        green: 0,
        red: 0,
      },
      phone,
      position,
      birthday,
      lastName,
      firstName,
      isRegistered: true,
      connections: { skype, discort, telegram },
      changed: `${Date.now()}`,
    };

    const foundUser = await User.findOneAndUpdate(
      { email: req.session.user.email },
      userData,
    );

    if (!foundUser) {
      req.flash("warning", warnings.register.registerHasExpired);
      return res.send({
        message: warnings.register.registerHasExpired,
        messageType: "warning",
      });
    }

    // await loadDataToDB(RegisterLink, getRegisterLinksData());
    // const link = await RegisterLink.findOneAndUpdate(
    //   { id: 2 },
    //   { userId: foundUser._id },
    // );
    // const registerLink = `${process.env.BASE_URL}${link.link}/${link._id}`;
    // await transporter.sendMail(registerConfirmMail(foundUser.email, registerLink));
    // req.flash("success", successes.register.confirmRegister);

    req.session.destroy();
    return res.send({
      // message: successes.register.confirmRegister,
      message: "Personal data is saved.",
      messageType: "success",
    });
  } catch (error) {
    console.log(`>>> Error /register/3: ${error}`);
  }
});

// router.get("/link/:id", async (req, res) => {
//   try {
//     const { urlPrefixLanguage } = res.locals;
//     const { warnings, successes } = getDictionary(urlPrefixLanguage);
//     const { id } = req.params;

//     const foundLink = await RegisterLink.findOne({ _id: id });

//     if (!foundLink) {
//       await RegisterLink.findOneAndDelete({ _id: id });
//       req.flash("warning", warnings.register.registerHasExpired);
//       return res.redirect("/login");
//     }

//     const foundUser = await User.findOne({ _id: foundLink.userId });

//     if (foundLink.expires < Date.now() || !foundLink.persons) {
//       await RegisterLink.findOneAndDelete({ _id: id });
//       await User.findOneAndDelete({ _id: foundLink.userId });
//       req.flash("warning", warnings.register.registerHasExpired);
//       await transporter.sendMail(registerExpiredMail(foundUser.email));
//       return res.redirect("/login");
//     }

//     foundLink.persons -= 1;

//     if (!foundLink.persons) {
//       await RegisterLink.findOneAndDelete({ _id: id });
//     } else {
//       await RegisterLink.findOneAndUpdate(
//         { _id: id },
//         { persons: foundLink.persons, userId: undefined },
//       );
//     }

//     await User.findOneAndUpdate(
//       { _id: foundLink.userId },
//       {
//         isRegistered: true,
//         confirmCode: "",
//         confirmCodeExpires: null,
//         changed: `${Date.now()}`,
//       },
//     );

//     req.flash("success", successes.register.accountRegistered);
//     await transporter.sendMail(registerSuccessMail(foundUser.email));

//     // return res.redirect("/login");
//     return res.send("<script>window.close();</script > ");
//   } catch (error) {
//     console.log(`>>> Error /register/link/:id: ${error}`);
//   }
// });

module.exports = router;
