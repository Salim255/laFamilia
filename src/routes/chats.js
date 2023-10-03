const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chatController");

const chatUserController = require("../controllers/chatUserController");

const authController = require("../controllers/authController");
//Create chat
router.post(
  "/",
  authController.protect,
  chatController.createChat,
  chatUserController.createChatUser,
);

//Update chat
router.post("/:postId", async (req, res) => {});

//Get chats
router.get("/", authController.protect, chatController.getChatsByUser);

//Delete chat
router.delete("/:postId", async (req, res) => {});

module.exports = router;
