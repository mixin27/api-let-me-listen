const mongoose = require("mongoose");
const config = require("config");

const { accessLog } = require("../utils/logger");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Connected to ${db}`);
      //   accessLog.info(`Connected to ${db}`);
    });
};
