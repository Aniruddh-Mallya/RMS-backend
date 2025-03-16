const jwt = require("jsonwebtoken");
const { query } = require("../adapters/DatabaseAdapter");
require("dotenv").config();

const loginUser = async (email, password) => {
  try {
    // Fetch user from database
    const result = await query("SELECT id, email, role, password FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return { success: false, message: "Invalid credentials" };
    }

    const user = result.rows[0];

    // Ensure role is properly retrieved
    if (!user.role) {
      console.error("Role not found for user:", email);
      return { success: false, message: "Role is missing in the database" };
    }

    // Compare plain text passwords
    if (password !== user.password) {
      return { success: false, message: "Invalid credentials" };
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log("User role retrieved:", user.role); // Debugging
    return { success: true, token, role: user.role }; // Use `user.role`

  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Server error" };
  }
};

module.exports = { loginUser };
