module.exports = (req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  // res.locals.isAdmin = req.session.isAdmin;
  res.locals.csrf = req.csrfToken();

  next();
};
