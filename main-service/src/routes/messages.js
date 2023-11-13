const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const messageController = require("../controllers/messageController");

const reactionController = require("../controllers/reactionController");
//Create message;
router.post("/", authController.protect, messageController.createMessage);

router.post("/:messageId/reactions", authController.protect, reactionController.createReaction);

router.get("/", authController.protect, messageController.getMessages);

//Delete message
router.delete("/", async (req, res) => {});

module.exports = router;
