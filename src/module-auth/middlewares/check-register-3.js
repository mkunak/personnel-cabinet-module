module.exports = (req, res, next) => {
  if (!req.session.register3) return res.redirect("/register");
  next();
};
