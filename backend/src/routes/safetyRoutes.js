const express = require("express");
const router = express.Router();

router.post("/check", (req, res) => {
    const { source, destination, time } = req.body;

    let score = 100;

    const hour = parseInt(time.split(":")[0]);
    if (hour >= 22 || hour < 5) {
        score -= 30;
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
        message: "Initial safety evaluation completed"
    });
});

module.exports = router;
