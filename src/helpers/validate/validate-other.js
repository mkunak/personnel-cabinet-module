const getRegex = () => /^.{1,}$/;

module.exports = function validateOther(data) {
  const regex = getRegex();
  return regex.test(data);
};
