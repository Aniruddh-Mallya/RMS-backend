const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "testuser@example.com" && password === "password123") {
    return res.json({ message: "Login Successful!" }); // ✅ Return a simple response
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
});

module.exports = router;
