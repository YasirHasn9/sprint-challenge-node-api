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

module.exports = router;
