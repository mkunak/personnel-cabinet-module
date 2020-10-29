module.exports = (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  res.locals.returnTo = req.originalUrl;
  next();
};
