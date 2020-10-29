const { User } = require("../models");

const calculateCurrentRating = async (green, red) => {
  const userCounts = await User.estimatedDocumentCount();

  if (!red && !green) {
    return userCounts;
  }

  if (red && !green) {
    return userCounts;
  }

  if (!red && green) {
    return 1;
  }

  if (red && green) {
    return green / red;
  }
};

module.exports = calculateCurrentRating;
