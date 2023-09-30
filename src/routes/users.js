const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

//Auth  endpoints
router.post("/signup", authController.signup);

router.post("/login", authController.login);

//Get users
router.get("/", async (req, res) => {});

router.put("/:userId", async (req, res) => {});

router.delete("/:userId", async (req, res) => {});

module.exports = router;
