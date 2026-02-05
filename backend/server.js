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

const emergencyRoutes = require("./src/routes/emergencyRoutes");

app.use("/api/emergency", emergencyRoutes);

//Import routes
const safetyRoutes = require("./src/routes/safetyRoutes");

// Use routes
app.use("/api/safety", safetyRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





