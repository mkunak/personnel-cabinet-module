const fs = require("fs");
const { Types } = require("mongoose");
const { Router } = require("express");

const { upload } = require("../../api/multer");
const { checkAuth } = require("../../module-auth/middlewares");

const { User } = require("../../module-auth/models");
const { calculateCurrentRating } = require("../../module-auth/services");

const { Tip, News, Report } = require("../models");

const makeDir = require("../../helpers/make-dir");
const loadDataToDB = require("../../helpers/load-data-to-db");
const DateFormatter = require("../../helpers/date-formatter");

const Factory = require("../controllers");

const { getTipsData, getNewsData } = require("../../mock-data");
// const { getReportsData } = require("../../mock-data");

const router = Router();

router.get("/", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log(">>> mock data are loading to db ...");
    await loadDataToDB(Tip, getTipsData());
    await loadDataToDB(News, getNewsData());
    // await loadDataToDB(Report, getReportsData(userId));

    // const lastReport
    // = await Report.findOne({ isReport: true }).sort({ id: -1 }).lean();

    // const lastPrereport = await Report.findOne({ isPrereport: true })
    //   .sort({ id: -1 })
    //   .lean();

    console.log(">>> user folders are creating ...");
    const userDirName = `src/static/uploads/${userId}`;
    if (!fs.existsSync(userDirName)) fs.mkdirSync(userDirName);
    const avatarDirName = `src/static/uploads/${userId}/avatar`;
    if (!fs.existsSync(avatarDirName)) makeDir(avatarDirName);
    const reportsDirName = `src/static/uploads/${userId}/reports`;
    if (!fs.existsSync(reportsDirName)) makeDir(reportsDirName);

    console.log(">>> user rating is calculating ...");
    const user = await User.findOne({ _id: userId });
    const { green, red } = user.points;
    const rating = await calculateCurrentRating(green, red);
    user.ratings = [rating];
    // user.lastReport = {
    //   id: Types.ObjectId(lastReport._id),
    //   date: lastReport.created,
    // };
    // user.lastPrereport = {
    //   id: Types.ObjectId(lastPrereport._id),
    //   date: lastPrereport.created,
    // };
    await user.save();

    res.redirect("/cabinet/dashboard");
  } catch (error) {
    console.log(">>> Error GET /cabinet:", error);
  }
});

router.get("/dashboard", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const user = await User.findOne({ _id: userId }).lean();
    const report = await Report.findOne({ userId }).sort({ created: -1 }).lean();
    const pinnedNews = await News.findOne({ id: 2 }).lean();
    const tip = await Tip.findOne().sort({ created: 1 }).skip(0).lean();

    let isRatingPositive = true;
    const ratingsLen = user.ratings.length;
    if (ratingsLen > 1) {
      if (user.ratings[ratingsLen - 1] < user.ratings[ratingsLen - 2]) {
        isRatingPositive = false;
      }
    }

    res.render("pages/cabinet/dashboard", {
      title: "GS App [Cabinet > Dashboard]",
      isCabinet: true,
      isDashboard: true,
      tip,
      user,
      report,
      pinnedNews,
      isRatingPositive,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(">>> Error GET /cabinet/dashboard:", error);
  }
});

router.get("/profile", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const user = await User.findOne({ _id: userId }).lean();

    const positions = [
      { position: "Менеджер", isActive: user.position === "Менеджер" },
      { position: "Продажник", isActive: user.position === "Продажник" },
      { position: "HR", isActive: user.position === "HR" },
      { position: "Программист", isActive: user.position === "Программист" },
      { position: "Дизайнер", isActive: user.position === "Дизайнер" },
    ];

    console.log(">>> user:", user);

    res.render("pages/cabinet/profile", {
      title: "GS App [Cabinet > Profile]",
      isCabinet: true,
      isProfile: true,
      user,
      positions,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(">>> Error GET /cabinet/profile:", error);
  }
});

router.get("/prereports", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const tip = await Tip.findOne().sort({ created: 1 }).skip(0).lean();
    const prereport = await Report.findOne({ userId, isPrereport: true })
      .sort({ created: -1 })
      .skip(0)
      .lean();

    if (!prereport) {
      return res.render("pages/cabinet/prereports", {
        title: "GS App [Cabinet > Prereports]",
        isCabinet: true,
        isReports: true,
        tip,
        prereport: {},
        isLoggedIn: JSON.stringify(req.session.isLoggedIn),
        // isLoggedIn: req.session.isLoggedIn,
      });
    }

    const { created, changed } = prereport;
    prereport.created = DateFormatter.getDateFromStamp(created, "time");
    prereport.changed = DateFormatter.getDateFromStamp(changed, "time");

    res.render("pages/cabinet/prereports", {
      title: "GS App [Cabinet > Prereports]",
      isCabinet: true,
      isReports: true,
      tip,
      prereport,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(">>> Error GET /cabinet/prereports:", error);
  }
});

router.get("/reports", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const tip = await Tip.findOne().sort({ created: -1 }).skip(0).lean();
    const report = await Report.findOne({ userId, isReport: true })
      .sort({ created: -1 })
      .skip(0)
      .lean();

    if (!report) {
      return res.render("pages/cabinet/reports", {
        title: "GS App [Cabinet > Reports]",
        isCabinet: true,
        isReports: true,
        tip,
        report: {},
        isLoggedIn: JSON.stringify(req.session.isLoggedIn),
        // isLoggedIn: req.session.isLoggedIn,
      });
    }

    const { created, changed } = report;
    report.created = DateFormatter.getDateFromStamp(created, "time");
    report.changed = DateFormatter.getDateFromStamp(changed, "time");

    res.render("pages/cabinet/reports", {
      title: "GS App [Cabinet > Reports]",
      isCabinet: true,
      isReports: true,
      tip,
      report,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(">>> Error GET /cabinet/reports:", error);
  }
});

router.get("/report-storage", checkAuth, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const reports = await Report.find({ userId, isReport: true })
      .sort({ changed: -1 })
      .lean();

    const prereports = await Report.find({ userId, isPrereport: true })
      .sort({ changed: -1 })
      .lean();

    const currentDate = DateFormatter.getDateFromStamp(Date.now(), "time");
    reports.forEach((report) => {
      const { created, changed } = report;
      report.created = DateFormatter.getDateFromStamp(created, "time");
      report.changed = DateFormatter.getDateFromStamp(changed, "time");
    });
    prereports.forEach((report) => {
      const { created, changed } = report;
      report.created = DateFormatter.getDateFromStamp(created, "time");
      report.changed = DateFormatter.getDateFromStamp(changed, "time");
    });

    res.render("pages/cabinet/report-storage", {
      title: "GS App [Cabinet > Report Storage]",
      isReportStorage: true,
      reports,
      prereports,
      currentDate,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/overall-rating", checkAuth, async (req, res) => {
  try {
    const currentDate = DateFormatter.getDateFromStamp(Date.now(), "time");

    const users = await User.find().sort({ "points.green": -1 }).lean();

    console.log(users);

    res.render("pages/cabinet/overall-rating", {
      title: "Cabinet > Overall Rating",
      isCabinet: true,
      isOverallRating: true,
      users,
      currentDate,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/profile/update", upload.any(), checkAuth, async (req, res) => {
  try {
    console.log(">>>", req.body);

    res.send({
      message: "Profile data change request was send successfully.",
      messageType: "success",
    });
  } catch (error) {
    console.log(">>> Error POST /cabinet/profile/update:", error);
  }
});

router.post(
  "/profile/update-avatar",
  upload.single("avatar"),
  checkAuth,
  Factory.updateAvatar(User, { renameFn: fs.rename }),
);

router.post(
  "/create-prereport",
  upload.any(),
  checkAuth,
  Factory.createPrereport({ User, Report }, { DateFormatter, Types, loadDataToDB }),
);

router.post(
  "/create-report",
  upload.any(),
  checkAuth,
  Factory.createReport({ User, Report }, { DateFormatter, Types, loadDataToDB }),
);

router.post(
  "/update-report",
  upload.any(),
  checkAuth,
  Factory.updateReport({ User, Report }, { Types }),
);

router.post(
  "/update-prereport",
  upload.any(),
  checkAuth,
  Factory.updatePrereport({ User, Report }, { Types }),
);

router.post("/new-tip", upload.any(), checkAuth, Factory.getNextTip(Tip));

module.exports = router;
