const { errorLog } = require("../utils/logger");

module.exports = function (err, req, res, next) {
  //   errorLog.error(err.message, err);
  console.log(err);
  res.status(500).send("Something went wrong.");
};
