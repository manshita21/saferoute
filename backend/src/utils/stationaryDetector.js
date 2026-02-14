const trackingState = require("./trackingState");

const STATIONARY_TIME_LIMIT = 10000; // 10 sec
const DISTANCE_THRESHOLD = 20; // meters

const detectStationary = (userId, lat, lon) => {
    const now = Date.now();

    if (!trackingState[userId]) {
        trackingState[userId] = {
            lat,
            lon,
            lastMoved: now,
        };
        return "MOVING";
    }

    const prev = trackingState[userId];

    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371000; // meters
    const dLat = toRad(lat - prev.lat);
    const dLon = toRad(lon - prev.lon);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(prev.lat)) *
        Math.cos(toRad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceMoved = R * c;



    if (distanceMoved > DISTANCE_THRESHOLD) {
        trackingState[userId] = { lat, lon, lastMoved: now };
        return "MOVING";
    }

    if (now - prev.lastMoved > STATIONARY_TIME_LIMIT) {
        return "STATIONARY";
    }

    return "IDLE";
};

module.exports = detectStationary;
