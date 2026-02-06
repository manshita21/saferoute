const express = require("express");
const CommunityFeedback = require("../models/CommunityFeedback");
const router = express.Router();



router.post("/check", async (req, res) => {
    const { source, destination, time } = req.body;

    let score = 100;

    const hour = parseInt(time.split(":")[0]);
    if (hour >= 22 || hour < 5) {
        score -= 30;
    }

    // Community feedback
    const feedbacks = await CommunityFeedback.find({ source, destination });

    if (feedbacks.length > 0) {
        const avgRating =
            feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;

        if (avgRating < 3) score -= 25;
        else if (avgRating >= 4) score += 10;
    }

    let level = "SAFE";
    if (score <= 70) level = "MODERATE";
    if (score <= 40) level = "UNSAFE";

    res.json({
        source,
        destination,
        time,
        score,
        level,
        CommunityFeedbackCount: feedbacks.length
    });
});

module.exports = router;
