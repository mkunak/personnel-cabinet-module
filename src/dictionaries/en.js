/* eslint-disable max-len */
module.exports = {
  errors: {
    reset: {
      repeatLater: "Warning! Something went wrong. Please, try again later.",
    },
  },

  warnings: {
    home: {
      VINWrong: "Warning! Entered VIN is out of base or not correct. Please, try again.",
    },
    catalog: {
      VINWrong: "Warning! Entered VIN is out of base or not correct. Please, try again.",
    },
    login: {
      passwordWrong: "Warning! Entered password is not correct. Please, try again.",
      emailWrong: "Warning! Entered email is not correct. Please, try again.",
      gmailNotVerified:
        "Warning! Entered email is not verified by Google. Please, enter another email.",
      emailNotConfirmed:
        "Warning! Entered email is not confirmed. Please, visit your email and confirm.",
      accountNotRegistered:
        "Warning! Account is not registered. Please, start registration from the beginning.",
    },
    register: {
      passwordWrong: "Warning! Entered passwords are not matched. Please, try again.",
      noPassword: "Password fields should be filled.",
      emailWrong: "Warning! Entered email is in use. Please, try another email.",
      codeWrong: "Warning! Entered code is wrong. Please, try again.",
      codeHasExpired: "Warning! Code has expired. Please, register again.",
      registerHasExpired: "Warning! Registration has expired. Please, register again.",
      tokenHasExpired: "Warning! Token has expired. Please, register again.",
    },
    reset: {
      repeatLater: "Warning! Something went wrong. Please, try again later.",
      userNotFound: "Warning! User with this email not found.",
    },
    newPassword: {
      tokenHasExpired:
        "Warning! Token has expired. Please, try to reset your password again.",
      passwordMismatch: "Warning! Password mismatch. Please, try again.",
      userNotFound:
        "Warning! Something went wrong! User not found. Please, log in and try again.",
    },
    google: {
      gmailNotVerified:
        "Warning! Entered email is not verified by Google. Please, enter another email or change registration type.",
      repeatLater: "Warning! Something went wrong. Please, try again later.",
    },
    facebook: {
      accountNotVerified:
        "Warning! Entered email is not verified by Facebook. Please, try another Facebook account or change registration type.",
      repeatLater: "Warning! Something went wrong. Please, try again later.",
    },
  },

  successes: {
    login: {
      succeeded: "You are logged in!",
    },
    logout: {
      succeeded: "You are logged out!",
    },
    register: {
      confirmCode:
        "You are on right way. Please, visit your email and open a letter with confirmation code. Good luck!",
      confirmEmail:
        "You are on right way. Please, confirm your registration. To do this, visit your email and open a letter with instructions. Good luck!",
      codeIsConfirmed: "You are on right way. Your code is confirmed.",
      confirmed: "Congrats! Your email is confirmed. Please, log in.",
      confirmRegister:
        "You are on right way. Please, confirm your registration in order to create your account. Visit your email and open a letter with instructions. Good luck!",
      accountRegistered: "Congrats! Your email is confirmed. Please, log in.",
    },
    google: {
      confirmEmail:
        "You are on right way. Please, confirm your registration.  To do this, visit your email and open a letter with instructions. Good luck!",
      confirmed: "Congrats! Your Gmail is confirmed. Please, log in.",
    },
    facebook: {
      confirmed: "Congrats! Your Facebook account is confirmed. You are logged in.",
    },
    newPassword: {
      succeeded: "Your password was changed successfully.",
    },
    reset: {
      succeeded: "We send you a mail with instructions to reset current password.",
    },
  },

  text: {},
};
