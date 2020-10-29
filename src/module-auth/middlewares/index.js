const checkAuth = require("./check-auth");
const checkRegister2 = require("./check-register-2");
const checkRegister3 = require("./check-register-3");
const checkAdminAuth = require("./check-admin-auth");
const checkInverseAuth = require("./check-inverse-auth");
const rememberToReturn = require("./remember-route-to-return");
const setResponseAuthVariables = require("./response-variables");

module.exports = {
  checkAuth,
  checkRegister2,
  checkRegister3,
  checkAdminAuth,
  checkInverseAuth,
  rememberToReturn,
  setResponseAuthVariables,
};
