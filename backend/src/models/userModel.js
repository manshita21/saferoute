const mongoose = require("mongoose");

console.log("🔥 USER MODEL FILE LOADED");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;