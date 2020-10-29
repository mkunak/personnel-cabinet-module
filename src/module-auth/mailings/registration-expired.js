require("dotenv").config();

const html = require("./html-templates/registration-expired");

module.exports = (email) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "GS App. Registration period is expired",
  html: html(),
});
