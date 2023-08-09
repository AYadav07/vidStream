const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const commentController = require("../controllers/comments");

router.post("/", verifyToken, commentController.addComment);

router.delete("/:id", verifyToken, commentController.deleteComment);

router.get("/:videoId", commentController.getComments);

//router.post("/", verifyToken, commentController);

module.exports = router;