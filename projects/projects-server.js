const express = require("express");
const projectsDb = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await projectsDb.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.name && !req.body.description) {
      return res.status(401).json({
        message: "Name and description should filled in!"
      });
    }
    const projects = await projectsDb.insert(req.body);
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
