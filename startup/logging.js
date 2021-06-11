const { transports } = require("winston");
require("express-async-errors");

const { errorLog } = require("../util/logger");

module.exports = function () {
  errorLog.exceptions.handle(
    new transports.Console(),
    new transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (err) => {
    throw err;
  });
};
