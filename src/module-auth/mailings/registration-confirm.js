require("dotenv").config();

const html = require("./html-templates/registration-confirm");

module.exports = (email, url) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "Confirm account registration",
  html: html(url),
});
