const { Pool } = require("pg");
require("dotenv").config();

let pool;
let query = () => {
  console.log("Database is mocked. Returning empty query.");
  return Promise.resolve({ rows: [] }); // Return an empty successful query result
};

// ✅ ADD: Only connect to the database if mock mode is NOT active
if (process.env.USE_MOCK_DATA !== 'true') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  pool.connect()
    .then(() => console.log("Connected to PostgreSQL Database via DatabaseAdapter"))
    .catch((err) => {
      console.error("Database Connection Failed in DatabaseAdapter:", err);
      process.exit(1);
    });
  
  // Assign the real query function
  query = (text, params) => pool.query(text, params);
}

module.exports = {
  query,
  pool,
};