const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const videoController = require("../controllers/video");

router.post("/", verifyToken, videoController.addVideo);

router.put("/:id", verifyToken, videoController.updateVideo);

router.delete("/:id", verifyToken, videoController.deleteVideo);

router.get("/find/:id", videoController.getVideo);

router.put("/view/:id", videoController.addView);

router.get("/trend", videoController.getTrend);

router.get("/random", videoController.getRandom);

router.get("/sub", verifyToken, videoController.addSub);

router.get("/tags", videoController.getByTags);

router.get("/search", videoController.search);


module.exports = router;