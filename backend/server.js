console.log("CWD:", process.cwd());

const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const connectDB = require("./src/config/db");

const app = express();

connectDB();



// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "SafeRoute backend is running 🚦" });
});

//Import routes
const emergencyRoutes = require("./src/routes/emergencyRoutes");
const safetyRoutes = require("./src/routes/safetyRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");

console.log("feedbackRoutes value:", feedbackRoutes);


console.log("emergencyRoutes type:", typeof emergencyRoutes);
console.log("safetyRoutes type:", typeof safetyRoutes);
console.log("feedbackRoutes type:", typeof feedbackRoutes);

//Use routes
app.use("/api/emergency", emergencyRoutes);
app.use("/api/safety", safetyRoutes);
app.use("/api/feedback", feedbackRoutes);

const authRoutes = require("./src/routes/authRoutes");
console.log("authRoutes type:", typeof authRoutes);
console.log("authRoutes value:", authRoutes);

app.use("/api/auth", authRoutes);


// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





