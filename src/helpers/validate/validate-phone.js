const getRegex = () => /^\+?[0-9]{10,}$/;

module.exports = function validatePhone(phone) {
  const regex = getRegex();
  return regex.test(phone);
};
