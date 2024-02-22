const express = require("express");

const router = express.Router();

const userPhotosController = require("../controllers/user-photos-controller");
//Create a post
router.get("/", userPhotosController.getUserPhotos);

module.exports = router;
