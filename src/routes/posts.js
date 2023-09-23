const express = require("express");
const { route } = require("./users");

const router = express.Router();

//Create a post
router.post("/", async (req, res) => {});

//Update a post
router.put("/:postId", async (req, res) => {});

//Get posts
router.get("/", async (req, res) => {});

//Delete a post
router.delete("/:postId", async (req, res) => {});

module.exports = router;
