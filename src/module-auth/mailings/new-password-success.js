require("dotenv").config();

const html = require("./html-templates/new-password-success");

module.exports = (email) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "New password",
  html: html(),
});
