console.log("🔥 AUTH MIDDLEWARE FILE LOADED");

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    console.log("AUTH HEADER:", req.headers.authorization);
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("TOKEN RECEIVED:", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("DECODED:", decoded);

            req.user = { id: decoded.id };
            return next();
        } catch (error) {
            console.log("JWT ERROR:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect;
