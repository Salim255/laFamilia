const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const commentController = require("../controllers/commentController");

const reactionController = require("../controllers/reactionController");
//Create comment
router.post("/", authController.protect, commentController.createComment);

router.post("/:commentId/reactions", authController.protect, reactionController.createReaction);

//Update comment
router.put("/commentId", async (req, res) => {});

//Delete comment
router.delete("/:commentId", async (req, res) => {});

module.exports = router;
