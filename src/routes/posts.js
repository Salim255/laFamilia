const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const postController = require("../controllers/postController");

const commentController = require("../controllers/commentController");

const reactionController = require("../controllers/reactionController");

//Create a post
router.post("/", authController.protect, postController.createPost);

router.post("/:postId/comments", authController.protect, commentController.createComment);

router.post("/:postId/reactions", authController.protect, reactionController.createReaction);

//Update a post
router.put("/:postId", authController.protect, postController.updatePost);

//Get posts
router.get("/", async (req, res) => {});

//Delete a post
router.delete("/:postId", authController.protect, postController.deletePost);

module.exports = router;
