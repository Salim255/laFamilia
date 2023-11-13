const express = require("express");

const router = express.Router();

const chatUserController = require("../controllers/chatUserController");

const authController = require("../controllers/authController");
//Create chat
router.post("/", chatUserController.createChatUser);

//Get chatUser
router.get("/", authController.protect, chatUserController.getChatUser);

//Delete chat
router.delete("/:chatUserId", authController.protect, chatUserController.deleteChatUser);

module.exports = router;
