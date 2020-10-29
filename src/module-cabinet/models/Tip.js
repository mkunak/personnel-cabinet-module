const { Schema } = require("mongoose");

const { connect } = require("../../api/mongodb");

const tipSchema = new Schema({
  id: { type: Number },
  data: [String],
  created: { type: Date },
});

module.exports = connect.model("Tip", tipSchema);
