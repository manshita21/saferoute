const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/login", (req, res) => {
  const fakeUserId = new mongoose.Types.ObjectId().toString();

  const token = jwt.sign(
    { id: fakeUserId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
