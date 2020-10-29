const fs = require("fs");
const path = require("path");

module.exports = function makeDir(dirPath) {
  fs.mkdir(path.join(dirPath), (err) => {
    if (err) console.log(err);
    console.log(`Directory ${dirPath} was created!`);
  });
};
