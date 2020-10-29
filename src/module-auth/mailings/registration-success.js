require("dotenv").config();

const html = require("./html-templates/registration-success");

module.exports = (email) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "GS App. Account was created",
  html: html(),
});
