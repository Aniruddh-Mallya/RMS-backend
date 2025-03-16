require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const researchRoutes = require("./routes/ResearchRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", researchRoutes); 

app.get("/", (req, res) => res.send("RMS Backend is Running!"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
