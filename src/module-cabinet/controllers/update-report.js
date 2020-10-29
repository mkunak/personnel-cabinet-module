const updateReport = (Models, helpers) => async (req, res) => {
  const { User, Report } = Models;
  const { Types } = helpers;

  try {
    const userId = req.session.user._id;

    const {
      workingHours,
      doneTasks,
      inProgressTasks,
      onCheckTasks,
      todoTasks,
      links,
      reportId,
    } = req.body;

    const foundReport = await Report.findOneAndUpdate(
      { _id: reportId },
      {
        workingHours,
        tasks: {
          done: doneTasks.split("***"),
          inProgress: inProgressTasks.split("***"),
          onCheck: onCheckTasks.split("***"),
          todo: todoTasks.split("***"),
        },
        changed: `${Date.now()}`,
        links: links.split("***"),
        isReport: true,
        isPrereport: false,
        userId: Types.ObjectId(userId),
      },
    );

    const user = await User.findOne({ _id: userId });
    user.lastReport = {
      id: Types.ObjectId(foundReport._id),
      date: foundReport.changed,
    };
    await user.save();

    res.send({
      message: "Report is edited and saved.",
      messageType: "success",
    });
  } catch (error) {
    console.log(">>> Error POST /cabinet/reports:", error);
  }
};

module.exports = updateReport;
