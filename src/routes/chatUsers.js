const express = require("express");

const router = express.Router();

const chatUserController = require("../controllers/chatUserController");

const authController = require("../controllers/authController");
//Create chat
router.post("/", chatUserController.createChatUser);

//Update chat
router.post("/:postId", async (req, res) => {});

//Get chatUser
router.get("/", authController.protect, chatUserController.getChatUser);

//Delete chat
router.delete("/:postId", async (req, res) => {});

module.exports = router;
