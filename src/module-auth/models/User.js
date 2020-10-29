const { Schema } = require("mongoose");

const { connect } = require("../../api/mongodb");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastName: { type: String },
  firstName: { type: String },
  birthday: { type: String },
  phone: { type: Number },
  avatar: { type: String },
  ratings: [{ type: Number }],
  points: {
    red: { type: Number, default: 0 },
    green: { type: Number, default: 0 },
  },
  rates: [{ type: Number }],
  position: { type: String },
  connections: {
    telegram: String,
    discort: String,
    skype: String,
  },
  created: { type: String, default: `${Date.now()}`, required: true },
  changed: { type: String, default: `${Date.now()}`, required: true },
  lastReport: {
    id: { type: Schema.Types.ObjectId, ref: "Report" },
    date: { type: String },
  },
  lastPrereport: {
    id: { type: Schema.Types.ObjectId, ref: "Prereport" },
    date: { type: String },
  },
  telegramId: { type: String },
  special: { type: String },

  isConfirmed: { type: Boolean, required: true },
  isRegistered: { type: Boolean, required: true },
  resetToken: String,
  resetTokenExpires: Date,
  confirmCode: String,
  confirmCodeExpires: Date,
});

module.exports = connect.model("User", userSchema);
