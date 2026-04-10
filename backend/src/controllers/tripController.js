const Trip = require("../models/Trip");
const mongoose = require("mongoose");

// Get all trips for user
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
        // Map _id to id for frontend
        const mappedTrips = trips.map(t => {
            const trip = t.toObject();
            trip.id = trip._id;
            delete trip._id;
            return trip;
        });
        res.json(mappedTrips);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch trips" });
    }
};

// Create a trip
exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            user: new mongoose.Types.ObjectId(req.user.id),
            ...req.body
        });
        const tripObj = trip.toObject();
        tripObj.id = tripObj._id;
        delete tripObj._id;
        res.status(201).json(tripObj);
    } catch (error) {
        console.error("CREATE TRIP ERROR:", error);
        res.status(500).json({ message: "Failed to create trip" });
    }
};

// Update a trip (status, feedback, etc)
exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: req.body },
            { new: true }
        );
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        const tripObj = trip.toObject();
        tripObj.id = tripObj._id;
        delete tripObj._id;
        res.json(tripObj);
    } catch (error) {
        res.status(500).json({ message: "Failed to update trip" });
    }
};

// Delete all trips (for clear history)
exports.deleteTrips = async (req, res) => {
    try {
        await Trip.deleteMany({ user: req.user.id });
        res.json({ message: "Trips cleared" });
    } catch (error) {
        res.status(500).json({ message: "Failed to clear trips" });
    }
}
