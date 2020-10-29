module.exports = (req, res, next) => {
  // res.locals.urlPrefixLanguage = req.cookies.locale;

  next();
};
