const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { query, TYPES } = require("../adapters/DatabaseAdapter");
require("dotenv").config();

const loginUser = async (email, password) => {
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