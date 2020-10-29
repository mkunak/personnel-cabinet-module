require("dotenv").config();
const { createConnection } = require("mongoose");

module.exports = {
  connect: createConnection(process.env.MONGODB_CABINET_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }),
};
