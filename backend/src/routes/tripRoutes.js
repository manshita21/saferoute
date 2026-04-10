const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware.js");

const {
    getTrips,
    createTrip,
    updateTrip,
    deleteTrips
} = require("../controllers/tripController");

router.get("/", protect, getTrips);
router.post("/", protect, createTrip);
router.put("/:id", protect, updateTrip);
router.delete("/", protect, deleteTrips);

module.exports = router;
