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
router.post("/:chatId", async (req, res) => {});

//Get chats
router.get("/", authController.protect, chatController.getChatsByUser);

//Delete chat
router.delete("/:chatId", authController.protect, chatController.deleteChat);

//Delete chatUser form chat
router.delete(
  "/:chatId/chatUsers/:chatUserId",
  authController.protect,
  chatUserController.deleteChatUser,
);

module.exports = router;
