const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

//Auth  endpoints
router.post("/signup", authController.signup);

router.post("/login", async (req, res) => {});

//Get users
router.get("/", async (req, res) => {});

router.put("/", async (req, res) => {});

router.delete("/", async (req, res) => {});

module.exports = router;
