const updatePrereport = (Models, helpers) => async (req, res) => {
  const { User, Report } = Models;
  const { Types } = helpers;

  try {
    const userId = req.session.user._id;

    const { workingHours, todoTasks, prereportId } = req.body;

    const foundReport = await Report.findOneAndUpdate(
      { _id: prereportId },
      {
        workingHours,
        tasks: {
          todo: todoTasks.split("***"),
        },
        changed: `${Date.now()}`,
        isReport: false,
        isPrereport: true,
        userId: Types.ObjectId(userId),
      },
    );

    const user = await User.findOne({ _id: userId });
    user.lastPrereport = {
      id: Types.ObjectId(foundReport._id),
      date: foundReport.changed,
    };
    await user.save();

    res.send({
      message: "Prereport is edited and saved.",
      messageType: "success",
    });
  } catch (error) {
    console.log(">>> Error POST /cabinet/reports:", error);
  }
};

module.exports = updatePrereport;
