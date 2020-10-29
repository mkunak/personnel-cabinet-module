module.exports = (req, res, next) => {
  if (!req.session.register2) return res.redirect("/register");
  next();
};
