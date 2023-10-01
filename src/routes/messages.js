const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const messageController = require("../controllers/messageController");

//Create message;
router.post("/", authController.protect, messageController.createMessage);

router.get("/", authController.protect, messageController.getMessages);

//Delete message
router.delete("/", async (req, res) => {});

module.exports = router;
