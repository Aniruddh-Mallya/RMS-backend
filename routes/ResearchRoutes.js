const express = require("express");
const { getAllProjects, addProject } = require("../services/ResearchService");
const SecurityAdapter = require("../adapters/SecurityAdapter");

const router = express.Router();

// Apply dynamic security
router.get("/projects", SecurityAdapter.authenticate, async (req, res) => {
    const projects = await getAllProjects();
    res.json(projects);
  });
  
router.post("/projects", SecurityAdapter.authenticate, async (req, res) => {
    const { title, researcher } = req.body;
    if (!title || !researcher) {
      return res.status(400).json({ message: "Title and Researcher are required" });
    }
  
    const newProject = await addProject(title, researcher);
    res.json(newProject);
  });

module.exports = router;
