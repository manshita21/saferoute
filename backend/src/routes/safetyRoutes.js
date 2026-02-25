const express = require("express");
const CommunityFeedback = require("../models/CommunityFeedback");
const fetchEnvironmentalContext = require("../utils/overpassService");
const stationaryDetector = require("../utils/stationaryDetector");

console.log("fetchEnvironmentalContext type:", typeof fetchEnvironmentalContext);

const router = express.Router();

router.post("/check", async (req, res) => {
    const { source, destination, time, lat, lon } = req.body;

    const userId = req.user?.id || "testUser"; // for testing

    const movementStatus = stationaryDetector(userId, lat, lon);

    console.log("Movement status:", movementStatus);

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

    /*if (lat && lon) {
        const env = await fetchEnvironmentalContext(lat, lon);

       
    }*/

    let env = { poiCount: 0, hospitalNearby: false, policeNearby: false };

    if (lat && lon) {
        try {
            env = await fetchEnvironmentalContext(lat, lon);
            if (env.poiCount > 20) score += 10;
            if (env.poiCount < 5) score -= 10;
            if (env.hospitalNearby) score += 5;
            if (env.policeNearby) score += 5;

        } catch (e) {
            console.log("Env fetch failed, skipping");
        }
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
        CommunityFeedbackCount: feedbacks.length,
        movementStatus
    });
});

module.exports = router;
