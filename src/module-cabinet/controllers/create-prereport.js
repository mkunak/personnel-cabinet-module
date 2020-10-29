const createPrereport = (Models, helpers) => {
  const { Report, User } = Models;
  const { DateFormatter, Types, loadDataToDB } = helpers;

  return async (req, res) => {
    try {
      const userId = req.session.user._id;
      const { workingHours, tasks } = req.body;

      const prereport = await Report.findOne({ userId, isPrereport: true })
        .sort({ id: -1 })
        .lean();

      if (prereport) {
        const lastPrereportDay = DateFormatter.getDayFromStamp(prereport.created);
        const currentDay = DateFormatter.getDayFromStamp(Date.now());
        if (lastPrereportDay === currentDay) {
          return res.send({
            message: `You have allready sent a prereport today. 
                      Visit report storage to make changes.`,
            messageType: "warning",
          });
        }
      }

      const foundPrereport = await Report.findOne().sort({ id: -1 }).lean();
      const newPrereport = {
        id: foundPrereport ? foundPrereport.id + 1 : 1,
        workingHours,
        tasks: { todo: tasks.split("***") },
        created: `${Date.now()}`,
        changed: `${Date.now()}`,
        isReport: false,
        isPrereport: true,
        userId: Types.ObjectId(userId),
      };

      await loadDataToDB(Report, [newPrereport]);

      const lastPrereport = await Report.findOne().sort({ id: -1 }).lean();
      const user = await User.findOne({ _id: userId });
      user.lastPrereport = {
        id: Types.ObjectId(lastPrereport._id),
        date: lastPrereport.changed,
      };
      await user.save();

      res.send({
        message: "Prereport is saved.",
        messageType: "success",
      });
    } catch (error) {
      console.log(">>> Error POST /cabinet/prereports:", error);
    }
  };
};

module.exports = createPrereport;
