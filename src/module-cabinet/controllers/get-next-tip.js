const getNextTip = (Model) => async (req, res) => {
  try {
    const { tipId } = req.body;

    const tipsCount = await Model.estimatedDocumentCount();

    const id = (Number(tipId) === 1) ? tipsCount : Number(tipId) - 1;

    const tip = await Model.findOne({ id }).sort({ id: 1 }).lean();

    res.send({ tip });
  } catch (error) {
    console.log(">>> Error POST /cabinet/new-tip:", error);
  }
};

module.exports = getNextTip;
