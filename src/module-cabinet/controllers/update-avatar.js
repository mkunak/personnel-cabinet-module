const updateAvatar = (Model, { renameFn }) => async (req, res) => {
  try {
    const userId = req.session.user._id;

    renameFn(
      `src/static/uploads/${userId}/${req.file.filename}`,
      `src/static/uploads/${userId}/avatar/${req.file.filename}`,
      (err) => {
        if (err) console.log(err);
        console.log("Rename completed!");
      },
    );

    await Model.findOneAndUpdate(
      { _id: userId },
      { avatar: `/uploads/${userId}/avatar/${req.file.filename}` },
    );

    res.send({
      message: "Profile data updated.",
      messageType: "success",
    });
  } catch (error) {
    console.log(">>> Error POST /cabinet/profile/update-avatar:", error);
  }
};

module.exports = updateAvatar;
