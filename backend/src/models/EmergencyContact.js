const mongoose = require("mongoose");

const emergencyContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        relation: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
