// const fs = require("fs");
// const { Types } = require("mongoose");
const { Router } = require("express");

const { upload } = require("../../api/multer");
const { checkAuth, checkAdminAuth } = require("../../module-auth/middlewares");

const { User } = require("../../module-auth/models");
const { Report, News, Tip } = require("../../module-cabinet/models");

// const makeDir = require("../../helpers/make-dir");
// const loadDataToDB = require("../../helpers/load-data-to-db");
const DateFormatter = require("../../helpers/date-formatter");

const router = Router();

router.get("/", checkAuth, checkAdminAuth, async (req, res) => {
  try {
    // const userId = req.session.user._id;
    // console.log(">>> user folders are creating ...");
    // const userDirName = `src/static/uploads/${userId}`;
    // if (!fs.existsSync(userDirName)) fs.mkdirSync(userDirName);
    // const avatarDirName = `src/static/uploads/${userId}/avatar`;
    // if (!fs.existsSync(avatarDirName)) makeDir(avatarDirName);
    // const reportsDirName = `src/static/uploads/${userId}/reports`;
    // if (!fs.existsSync(reportsDirName)) makeDir(reportsDirName);

    res.render("pages/admin", {
      title: "Admin",
    });
  } catch (error) {
    console.log(">>> Error GET /cabinet:", error);
  }
});

router.get("/dashboard", checkAuth, checkAdminAuth, async (req, res) => {
  try {
    res.render("pages/admin/dashboard", {
      title: "Admin > Dashboard",
      isAdmin: true,
      isDashboard: true,
      testMessage: "Hello Admin Dashboard from server",
    });
  } catch (error) {
    console.log(">>> Error GET /admin/dashboard:", error);
  }
});

router.get("/report-storage", checkAuth, checkAdminAuth, async (req, res) => {
  try {
    // const userId = req.session.user._id;
    const users = await User.find().lean();
    const reports = await Report.find({ isReport: true }).sort({ changed: -1 }).lean();
    const prereports = await Report.find({ isPrereport: true })
      .sort({ changed: -1 })
      .lean();

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
    users.forEach((user) => {
      const { created, changed } = user;
      user.created = DateFormatter.getDateFromStamp(created, "time");
      user.changed = DateFormatter.getDateFromStamp(changed, "time");
    });

    const currentDate = DateFormatter.getDateFromStamp(Date.now(), "time");

    res.render("pages/admin/report-storage", {
      title: "Admin > Report Storage",
      isAdmin: true,
      isReportStorage: true,
      reports,
      prereports,
      currentDate,
      users,
    });
  } catch (error) {
    console.log(">>> Error GET /admin/report-storage", error);
  }
});

router.post(
  "/report-storage/by-position",
  checkAuth,
  checkAdminAuth,
  upload.any(),
  async (req, res) => {
    const { position } = req.body;
    try {
      const users = position
        ? await User.find({ position }).lean()
        : await User.find({}).lean();
      users.forEach((user) => {
        const { created, changed } = user;
        user.created = DateFormatter.getDateFromStamp(created, "time");
        user.changed = DateFormatter.getDateFromStamp(changed, "time");
      });

      const reports = await Promise.all(
        users.map((user) => {
          return Report.find({ isReport: true, userId: user._id })
            .sort({ changed: -1 })
            .lean();
        }),
      );
      const prereports = await Promise.all(
        users.map((user) => {
          return Report.find({ isPrereport: true, userId: user._id })
            .sort({ changed: -1 })
            .lean();
        }),
      );
      const flatReports = reports.flat();
      const flatPrereports = prereports.flat();
      flatReports.forEach((report) => {
        const { created, changed } = report;
        report.created = DateFormatter.getDateFromStamp(created, "time");
        report.changed = DateFormatter.getDateFromStamp(changed, "time");
      });
      flatPrereports.forEach((report) => {
        const { created, changed } = report;
        report.created = DateFormatter.getDateFromStamp(created, "time");
        report.changed = DateFormatter.getDateFromStamp(changed, "time");
      });

      const namesSelect = position
        ? await User.find({ position }).lean()
        : await User.find({}).lean();

      res.send({
        message: "Hello by position",
        users,
        namesSelect,
        reports: flatReports,
        prereports: flatPrereports,
      });
    } catch (error) {
      console.log(">>> Error POST /report-storage/by-position:", error);
    }
  },
);

router.post(
  "/report-storage/by-name",
  checkAuth,
  checkAdminAuth,
  upload.any(),
  async (req, res) => {
    try {
      const { position, userId } = req.body;

      let users = [];
      if (userId) {
        users = await User.find({ _id: userId }).lean();
      } else if (position) {
        users = await User.find({ position }).lean();
      } else {
        users = await User.find({}).lean();
      }
      users.forEach((user) => {
        const { created, changed } = user;
        user.created = DateFormatter.getDateFromStamp(created, "time");
        user.changed = DateFormatter.getDateFromStamp(changed, "time");
      });

      const reports = await Promise.all(
        users.map((user) => {
          return Report.find({ isReport: true, userId: user._id })
            .sort({ changed: -1 })
            .lean();
        }),
      );
      const flatReports = reports.flat();
      flatReports.forEach((report) => {
        const { created, changed } = report;
        report.created = DateFormatter.getDateFromStamp(created, "time");
        report.changed = DateFormatter.getDateFromStamp(changed, "time");
      });

      const prereports = await Promise.all(
        users.map((user) => {
          return Report.find({ isPrereport: true, userId: user._id })
            .sort({ changed: -1 })
            .lean();
        }),
      );
      const flatPrereports = prereports.flat();
      flatPrereports.forEach((report) => {
        const { created, changed } = report;
        report.created = DateFormatter.getDateFromStamp(created, "time");
        report.changed = DateFormatter.getDateFromStamp(changed, "time");
      });

      const namesSelect = userId
        ? await User.find({ _id: userId }).lean()
        : await User.find({}).lean();

      res.send({
        message: "Hello by name",
        users,
        namesSelect,
        reports: flatReports,
        prereports: flatPrereports,
      });
    } catch (error) {
      console.log(">>> Error POST /report-storage/by-name:", error);
    }
  },
);

router.get("/user-profile/:id", checkAuth, checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).lean();

    const positions = [
      { position: "Менеджер", isActive: user.position === "Менеджер" },
      { position: "Продажник", isActive: user.position === "Продажник" },
      { position: "HR", isActive: user.position === "HR" },
      { position: "Программист", isActive: user.position === "Программист" },
      { position: "Дизайнер", isActive: user.position === "Дизайнер" },
    ];

    res.render("pages/admin/user/profile", {
      title: "Admin > User profile",
      isAdmin: true,
      isUserProfile: true,
      user,
      positions,
    });
  } catch (error) {
    console.log(`>>> Error GET /user-profile/${id}`, error);
  }
});

router.post(
  "/user-profile/update",
  checkAuth,
  checkAdminAuth,
  upload.any(),
  async (req, res) => {
    try {
      const {
        userId,
        rate,
        greenPoints,
        redPoints,
        firstName,
        email,
        birthday,
        phone,
        telegram,
        discort,
        skype,
        position,
      } = req.body;

      const newData = {
        points: {
          green: greenPoints,
          red: redPoints,
        },
        firstName,
        email,
        birthday,
        phone,
        connections: {
          telegram,
          discort,
          skype,
        },
        position,
        changed: `${Date.now()}`,
      };

      const user = await User.findOneAndUpdate({ _id: userId }, newData);
      user.rates.push(rate);
      await user.save();

      res.send({
        message: "Profile data change request was send successfully.",
        messageType: "success",
      });
    } catch (error) {
      console.log(">>> Error POST /admin/user-profile/update", error);
    }
  },
);

router.get("/user-dashboard/:id", checkAuth, checkAdminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).lean();
    const report = await Report.findOne({ userId: id }).sort({ created: -1 }).lean();
    const pinnedNews = await News.findOne({ id: 2 }).lean();
    const tip = await Tip.findOne().sort({ created: 1 }).skip(0).lean();

    let isRatingPositive = true;
    const ratingsLen = user.ratings.length;
    if (ratingsLen > 1) {
      if (user.ratings[ratingsLen - 1] < user.ratings[ratingsLen - 2]) {
        isRatingPositive = false;
      }
    }

    res.render("pages/admin/user/dashboard", {
      title: "Admin > User Dashboard",
      isAdmin: true,
      isUserDashboard: true,
      tip,
      user,
      report,
      pinnedNews,
      isRatingPositive,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
    });
  } catch (error) {
    console.log(`>>> Error GET /admin/user-dashboard/${id}`, error);
  }
});

router.get("/user-prereports/:id", checkAuth, checkAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).lean();
    const tip = await Tip.findOne().sort({ created: 1 }).skip(0).lean();
    const prereport = await Report.findOne({ userId: id, isPrereport: true })
      .sort({ created: -1 })
      .skip(0)
      .lean();

    if (!prereport) {
      return res.render("pages/admin/user/prereports", {
        title: "Admin > User Prereports",
        isAdmin: true,
        isUserReports: true,
        tip,
        user,
        prereport: {},
        isLoggedIn: JSON.stringify(req.session.isLoggedIn),
        // isLoggedIn: req.session.isLoggedIn,
      });
    }

    const { created, changed } = prereport;
    prereport.created = DateFormatter.getDateFromStamp(created, "time");
    prereport.changed = DateFormatter.getDateFromStamp(changed, "time");

    res.render("pages/admin/user/prereports", {
      title: "Admin > User Prereports",
      isAdmin: true,
      isUserReports: true,
      tip,
      user,
      prereport,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(`>>> Error GET /admin/user-prereports/${id}`, error);
  }
});

router.get("/user-reports/:id", checkAuth, checkAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).lean();
    const tip = await Tip.findOne().sort({ created: -1 }).skip(0).lean();
    const report = await Report.findOne({ userId: id, isReport: true })
      .sort({ created: -1 })
      .skip(0)
      .lean();

    if (!report) {
      return res.render("pages/admin/user/reports", {
        title: "Admin > User Reports",
        isAdmin: true,
        isUserReports: true,
        tip,
        user,
        report: {},
        isLoggedIn: JSON.stringify(req.session.isLoggedIn),
        // isLoggedIn: req.session.isLoggedIn,
      });
    }

    const { created, changed } = report;
    report.created = DateFormatter.getDateFromStamp(created, "time");
    report.changed = DateFormatter.getDateFromStamp(changed, "time");

    res.render("pages/admin/user/reports", {
      title: "Admin > User Reports",
      isAdmin: true,
      isUserReports: true,
      tip,
      user,
      report,
      isLoggedIn: JSON.stringify(req.session.isLoggedIn),
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(`>>> Error GET /admin/user-reports/${id}`, error);
  }
});

router.get("/user-report-storage/:id", checkAuth, checkAdminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    console.log("/user-report-storage", id);
    const user = await User.findOne({ _id: id }).lean();
    const reports = await Report.find({ userId: id, isReport: true })
      .sort({ changed: -1 })
      .lean();

    const prereports = await Report.find({ userId: id, isPrereport: true })
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

    res.render("pages/admin/user/report-storage", {
      title: "Admin > User Report Storage",
      isAdmin: true,
      isUserReportStorage: true,
      user,
      reports,
      prereports,
      currentDate,
    });
  } catch (error) {
    console.log(">>> Error GET /user-report-storage", error);
  }
});

module.exports = router;
