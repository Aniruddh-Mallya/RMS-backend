const db = require("../adapters/DatabaseAdapter");

const getAllProjects = async () => {
  try {
    const result = await db.query("SELECT * FROM research_projects");
    return result.rows;
  } catch (error) {
    console.error("Database error fetching projects:", error.message || error);
    return null; // Prevents server crashes
  }
};

const addProject = async (title, researcher) => {
  try {
    const result = await db.query(
      "INSERT INTO research_projects (title, researcher) VALUES ($1, $2) RETURNING *",
      [title, researcher]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Database error adding project:", error.message || error);
    return null;
  }
};

module.exports = { getAllProjects, addProject };
