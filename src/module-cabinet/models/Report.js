const { Schema } = require("mongoose");

const { connect } = require("../../api/mongodb");

const reportSchema = new Schema({
  id: { type: Number },
  created: { type: String },
  changed: { type: String },
  workingHours: { type: Number, default: 0, required: true },
  tasks: {
    todo: [String],
    inProgress: [String],
    onCheck: [String],
    done: [String],
  },
  links: [String],
  files: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isReport: Boolean,
  isPrereport: Boolean,
});

module.exports = connect.model("Report", reportSchema);
