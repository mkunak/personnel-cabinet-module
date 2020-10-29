// const getPasswordRegex = () => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
const getPasswordRegex = () => /^.{6,}$/;

module.exports = function validatePassword(password) {
  const regex = getPasswordRegex();
  return regex.test(password);
};
