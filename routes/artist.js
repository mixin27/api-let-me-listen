const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const artistController = require("../controllers/artist");
const { validate } = require("../models/artist");

router.get("/", artistController.getArtists);

router.post("/", [auth, validator(validate)], artistController.postArtist);

router.get("/:id", validateObjectId, artistController.getArtistById);

module.exports = router;
