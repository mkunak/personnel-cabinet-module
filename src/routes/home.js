const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  res.render("pages", {
    title: "[Home]",
    isHome: true,
  });
});

module.exports = router;
