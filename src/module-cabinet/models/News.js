const { Schema } = require("mongoose");

const { connect } = require("../../api/mongodb");

const newsSchema = new Schema({
  id: { type: Number },
  data: [{ type: String }],
  created: { type: Date, default: new Date(Date.now()) },
});

module.exports = connect.model("News", newsSchema);
