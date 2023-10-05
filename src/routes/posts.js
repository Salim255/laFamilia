const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const postController = require("../controllers/postController");

//Create a post
router.post("/", authController.protect, postController.createPost);

//Update a post
router.put("/:postId", async (req, res) => {});

//Get posts
router.get("/", async (req, res) => {});

//Delete a post
router.delete("/:postId", async (req, res) => {});

module.exports = router;
