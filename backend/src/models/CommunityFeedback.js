const mongoose = require("mongoose");

const communityFeedbackSchema = new mongoose.Schema(
    {
        source: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        rating: {
            type: Number, // 1 = Unsafe, 5 = Safe
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
        },
        travelTime: {
            type: String, // e.g. "23:30"
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("CommunityFeedback", communityFeedbackSchema);
