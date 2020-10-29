require("dotenv").config();

const html = require("./html-templates/code-confirm");

module.exports = (email, code) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "Confirmation code",
  html: html(code),
});
