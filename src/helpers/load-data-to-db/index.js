module.exports = async (Model, dataArray) => {
  try {
    await Promise.all(dataArray.map(async (dataItem) => Model.updateOne(
      { id: dataItem.id },
      { $set: { ...dataItem } },
      { upsert: true },
    )));
  } catch (error) {
    console.log(">>> Error from loadDataToDB:", error);
  }
};
