const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        plannedTimeISO: {
            type: String,
        },
        sourceLabel: {
            type: String,
        },
        destinationLabel: {
            type: String,
        },
        source: {
            lat: Number,
            lng: Number,
        },
        destination: {
            lat: Number,
            lng: Number,
        },
        safetyScore: {
            type: Number,
        },
        safetyLevel: {
            type: String,
            enum: ["Safe", "Moderate", "Unsafe", "SAFE", "MODERATE", "UNSAFE"],
        },
        status: {
            type: String,
            enum: ["planned", "tracking", "completed", "ended-early"],
            default: "planned",
        },
        feedback: {
            rating: { type: String, enum: ["Safe", "Unsafe"] }, // To match frontend types if we want, or map to Number
            comment: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
