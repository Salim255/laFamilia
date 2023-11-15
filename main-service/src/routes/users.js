const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const userController = require("../controllers/userController");

//Auth  endpoints
router.post("/signup", authController.signup);

router.post("/login", authController.login);

//Get users
router.get("/", authController.protect, userController.getUsers);

router.put("/", authController.protect, userController.updateUser);

router.delete("/", authController.protect, userController.deleteUser);

module.exports = router;
