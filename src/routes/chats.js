const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");
//Create chat
router.post("/", chatController.createChat);

//Update chat
router.post("/:postId", async (req, res) => {});

//Get chats
router.get("/", async (req, res) => {});

//Delete chat
router.delete("/:postId", async (req, res) => {});

module.exports = router;
