require("dotenv").config();

const html = require("./html-templates/code-success");

module.exports = (email) => ({
  to: email,
  from: process.env.EMAIL_FROM,
  subject: "GS App. Code confirmation success",
  html: html(),
});
