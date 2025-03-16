require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require("./routes/AuthRoutes");
const researchRoutes = require("./routes/ResearchRoutes");

const app = express();

// Secure CORS settings
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// Middleware
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Needed for secure connections on Render
});

// Verify Database Connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch((err) => {
    console.error("Database Connection Failed:", err);
    process.exit(1); // Stop the server if DB connection fails
  });

// Routes
app.use("/api", authRoutes);
app.use("/api", researchRoutes);

// Test Route
app.get("/", (req, res) => res.send("RMS Backend is Running!"));

// JWT Secret Validation
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is missing. Tokens may not be secure!");
}

// Start Server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
