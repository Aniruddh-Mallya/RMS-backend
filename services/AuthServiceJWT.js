const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { query, TYPES } = require("../adapters/DatabaseAdapter");
require("dotenv").config();

const loginUser = async (email, password) => {
  // ✅ ADD: Check for mock mode at the beginning of the function
  if (process.env.USE_MOCK_DATA === 'true') {
    console.log("Backend is in MOCK MODE.");
    // If the login attempt is for our mock user, return a success
    if (email === 'mock@example.com' && password === 'password') {
      // Generate a fake token for testing purposes
      const mockToken = jwt.sign(
        { userId: 'mock-user-id', email: 'mock@example.com', role: 'researcher' },
        process.env.JWT_SECRET || 'default-secret-for-mock-mode', // Use a default secret if none is set
        { expiresIn: '1h' }
      );
      return { success: true, token: mockToken, role: 'researcher' };
    } else {
      return { success: false, message: "Invalid credentials in mock mode" };
    }
  }

  // The original database logic runs if mock mode is off
  try {
    const result = await query(
      "SELECT id, email, role, password FROM users WHERE email = @email",
      [{ name: 'email', type: TYPES.NVarChar, value: email }]
    );
    if (result.rows.length === 0) {
      return { success: false, message: "Invalid credentials" };
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: "Invalid credentials" };
    }
    
    if (!user.role) {
      console.error("Role not found for user:", email);
      return { success: false, message: "Role is missing in the database" };
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { success: true, token, role: user.role };

  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Server error" };
  }
};

module.exports = { loginUser };