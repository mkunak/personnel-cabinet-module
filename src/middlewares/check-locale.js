module.exports = (req, res, next) => {
  const link = (`${req.originalUrl}`).slice(1, 3);

  if (!req.cookies.locale) {
    res.cookie("locale", "en", { maxAge: 900000, httpOnly: true });
    res.redirect("/en/home");
    return;
  }

  if (link === "en" && req.cookies.locale === "ru") {
    res.cookie("locale", "en", { maxAge: 900000, httpOnly: true });
    res.redirect(`/en/${(`${req.originalUrl}`).slice(4)}`);
    return;
  }

  if (link === "ru" && req.cookies.locale === "en") {
    res.cookie("locale", "ru", { maxAge: 900000, httpOnly: true });
    res.redirect(`/ru/${(`${req.originalUrl}`).slice(4)}`);
    return;
  }

  next();
};
