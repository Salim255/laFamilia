const express = require("express");

const router = express.Router();

//Create comment
router.post("/", async (req, res) => {});

//Update comment
router.put("/commentId", async (req, res) => {});

//Delete comment
router.delete("/:commentId", async (req, res) => {});

module.exports = router;
