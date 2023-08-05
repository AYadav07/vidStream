const express = require("express");
const router = express.Router();
const user = require('./users');
const video = require("./videos");
const comment = require("./comments");
const auth = require("./auth");

router.use("/auth",auth);
router.use("/user", user);
router.use("/video", video);
router.use("/comment", comment);

module.exports = router;