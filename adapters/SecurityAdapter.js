const jwt = require("jsonwebtoken");
require("dotenv").config();

const SecurityAdapter = {
  authenticate: (req, res, next) => {
    const securityMethod = process.env.SECURITY_METHOD; // "jwt", "apikey", "simple"

    switch (securityMethod) {
      case "jwt":
        return SecurityAdapter.verifyJWT(req, res, next);
      case "apikey":
        return SecurityAdapter.verifyAPIKey(req, res, next);
      case "simple":
      default:
        return next(); // No security applied
    }
  },

  verifyJWT: (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); // Proceed to actual business logic
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  },

  verifyAPIKey: (req, res, next) => {
    const providedKey = req.headers["x-api-key"];
    const validKey = process.env.API_KEY;

    if (!providedKey || providedKey !== validKey) {
      return res.status(401).json({ message: "Unauthorized: Invalid API key" });
    }

    next(); // Proceed if API key is correct
  },
};

module.exports = SecurityAdapter;
