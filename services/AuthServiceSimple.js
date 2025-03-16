const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = [
  { id: 1, email: "testuser@example.com", password: "password123", role: "researcher" },
  { id: 2, email: "admin@example.com", password: "adminpass", role: "admin" }
];

const loginUser = async (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  // Traditional login success response (without JWT)
  return { success: true, message: "Login successful!" };
};

module.exports = { loginUser };
