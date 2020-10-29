const { Schema } = require("mongoose");

const { connect } = require("../../api/mongodb");

const registerLinksSchema = new Schema({
  id: { type: Number, required: true },
  link: { type: String, required: true },
  persons: { type: Number, required: true },
  created: { type: Date, required: true },
  expires: { type: Date, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = connect.model("RegisterLinks", registerLinksSchema);
