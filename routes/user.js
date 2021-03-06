const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");

router.get("/me", auth, userController.me);

router.post("/", userController.create);

module.exports = router;
