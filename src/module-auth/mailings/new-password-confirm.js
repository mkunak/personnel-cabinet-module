require("dotenv").config();

const html = require("./html-templates/new-password-confirm");

module.exports = (email, token) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "GS App. Reset password confirmation",
  html: html(token),
});
