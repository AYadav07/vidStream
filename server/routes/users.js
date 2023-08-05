const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const verifyToken = require("../verifyToken");

router.put("/:id", verifyToken, userController.update);

router.delete("/:id", verifyToken, userController.deleteUser);

router.get("/find/:id", userController.getUser);

router.put("/sub/:id", verifyToken, userController.subscribe);

router.put("/unsub/:id", verifyToken, userController.unsubscribe);

router.put("/like/:videoId", userController.like);

router.put("/dislike/:videoId", userController.dislike);

module.exports = router;