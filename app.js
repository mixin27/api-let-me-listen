const express = require("express");

const { accessLog } = require("./util/logger");

const app = express();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  accessLog.info(`Server is listening on ${port}`);
});

module.exports = server;
