const express = require("express");
const router = express.Router();
const {
    getContacts,
    addContact,
    deleteContact,
} = require("../controllers/emergencyController");

// (Auth middleware will be added later)
router.get("/", getContacts);
router.post("/", addContact);
router.delete("/:id", deleteContact);

module.exports = router;
