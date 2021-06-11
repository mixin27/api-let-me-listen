const express = require("express");

const error = require("../middleware/errors");
const authRoutes = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());

  /** Routes */
  app.use("/api/auth", authRoutes);

  /** errors handling */
  app.use(error);
};
