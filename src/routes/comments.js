const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const commentController = require("../controllers/commentController");

//Create comment
router.post("/", authController.protect, commentController.createComment);

//Update comment
router.put("/commentId", async (req, res) => {});

//Delete comment
router.delete("/:commentId", async (req, res) => {});

module.exports = router;
