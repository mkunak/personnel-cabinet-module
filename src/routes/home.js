const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  res.render("pages", {
    title: "GS [Home]",
    isHome: true,
  });
});

module.exports = router;
