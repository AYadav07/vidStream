const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// SIGN UP
router.post("/signup", authController.signUp)

//SIGN IN
router.post("/signin", authController.signIn)


//Google Auth
router.post("/google", authController.googleAuth)


module.exports = router;