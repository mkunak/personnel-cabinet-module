const getRegex = () => /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

module.exports = function validateDate(date) {
  const regex = getRegex();
  return regex.test(date);
};
