require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const researchRoutes = require("./routes/ResearchRoutes");
const { pool } = require("./adapters/DatabaseAdapter"); // ✅ CHANGE: Import the pool to ensure connection is established

const app = express();

// Secure CORS settings
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));


// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", researchRoutes);

// Test Route
app.get("/", (req, res) => res.send("RMS Backend is Running!"));

// JWT Secret Validation
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is missing. Tokens may not be secure!");
}

// ✅ CHANGE: Corrected fallback port to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));