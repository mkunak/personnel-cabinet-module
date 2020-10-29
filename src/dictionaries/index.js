const en = require("./en");
const ru = require("./ru");

module.exports = (lang) => {
  if (lang === "en") return en;
  return ru;
};
