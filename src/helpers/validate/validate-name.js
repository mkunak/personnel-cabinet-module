const getRegex = () => /^[a-zA-Z]{1,}$/;

module.exports = function validateName(name) {
  const regex = getRegex();
  return regex.test(name);
};
