// ENTRY POINT FOR ALL AUTHENTICATIONS

const express = require("express");

// Dynamically load the authentication service based on SECURITY_METHOD
const securityMethod = process.env.SECURITY_METHOD;
let AuthService;

if (securityMethod === "jwt") {
  AuthService = require("../services/AuthServiceJWT");
} else if (securityMethod === "apikey") {
  AuthService = require("../services/AuthServiceAPIKey");
} else {
  AuthService = require("../services/AuthServiceSimple"); // Default to non-JWT authentication
}

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const response = await AuthService.loginUser(email, password);
    console.log("User login was a success.");
    
    if (!response.success) {
      return res.status(401).json(response);
    }

    // Ensure `role` is defined before using it
    const userRole = response.role ? response.role : "unknown"; // Default to avoid `undefined`
    console.log("User role retrieved from DB:", userRole);

    return res.json({ success: true, token: response.token, role: userRole });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
