const getEmailRegex = () => /\S+@\S+\.\S+/;

module.exports = function validateEmail(email) {
  const regex = getEmailRegex();
  return regex.test(email);
};
