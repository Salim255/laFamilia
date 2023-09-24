const express = require("express");

const router = express.Router();

//Create chat
router.post("/", async (req, res) => {});

//Update chat
router.post("/:postId", async (req, res) => {});

//Get chats
router.get("/", async (req, res) => {});

//Delete chat
router.delete("/:postId", async (req, res) => {});

module.exports = router;
