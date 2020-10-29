require("dotenv").config();

const html = require("./html-templates/new-password-confirm");

module.exports = (email, token) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "Reset password confirmation",
  html: html(token),
});
