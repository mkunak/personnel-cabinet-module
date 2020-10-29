const getRegex = () => /^[0-9]{6,6}$/;

module.exports = function validateConfirmCode(code) {
  const regex = getRegex();
  return regex.test(code);
};
