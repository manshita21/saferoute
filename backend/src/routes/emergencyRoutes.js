const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware.js");

const {
    getContacts,
    addContact,
    deleteContact,
} = require("../controllers/emergencyController");

console.log("protect type:", typeof protect);


router.get("/", protect, getContacts);
router.post("/", protect, addContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;
