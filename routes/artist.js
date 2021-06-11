const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const artistController = require("../controllers/artist");
const { validate } = require("../models/artist");

router.get("/", artistController.getArtists);

router.post("/", [auth, validator(validate)], artistController.postArtist);

module.exports = router;
