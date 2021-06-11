const express = require("express");

const error = require("../middleware/errors");
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const songRoutes = require("../routes/song");

module.exports = function (app) {
  app.use(express.json());

  /** Routes */
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/songs", songRoutes);

  /** errors handling */
  app.use(error);
};
