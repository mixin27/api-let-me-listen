const express = require("express");

const router = express.Router();

const songController = require("../controllers/song");

router.get("/", songController.getSongs);

module.exports = router;
