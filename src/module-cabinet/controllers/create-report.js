const createPrereport = (Models, helpers) => {
  const { Report, User } = Models;
  const { DateFormatter, Types, loadDataToDB } = helpers;

  return async (req, res) => {
    try {
      const userId = req.session.user._id;
      const { workingHours, doneTasks, inProgressTasks, todoTasks, links } = req.body;

      const report = await Report.findOne({ userId, isReport: true })
        .sort({ id: -1 })
        .lean();

      if (report) {
        const lastReportDay = DateFormatter.getDayFromStamp(report.created);
        const currentDay = DateFormatter.getDayFromStamp(Date.now());
        if (lastReportDay === currentDay) {
          return res.send({
            message: `You have allready sent a report today. 
                        Visit report storage to make changes.`,
            messageType: "warning",
          });
        }
      }

      const foundReport = await Report.findOne().sort({ id: -1 }).lean();

      const newReport = {
        id: foundReport ? foundReport.id + 1 : 1,
        workingHours,
        tasks: {
          done: doneTasks.split("***"),
          inProgress: inProgressTasks.split("***"),
          todo: todoTasks.split("***"),
        },
        links: links.split("***"),
        created: `${Date.now()}`,
        changed: `${Date.now()}`,
        isReport: true,
        isPrereport: false,
        userId: Types.ObjectId(userId),
      };

      await loadDataToDB(Report, [newReport]);

      const lastReport = await Report.findOne().sort({ id: -1 }).lean();
      const user = await User.findOne({ _id: userId });
      user.lastReport = {
        id: Types.ObjectId(lastReport._id),
        date: lastReport.changed,
      };
      await user.save();

      res.send({
        message: "Report is saved.",
        messageType: "success",
      });
    } catch (error) {
      console.log(">>> Error POST /cabinet/reports:", error);
    }
  };
};

module.exports = createPrereport;
