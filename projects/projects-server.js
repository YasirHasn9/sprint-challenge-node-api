const express = require("express");
const server = express();
const projectsDb = require("../data/helpers/projectModel");
const router = express.Router({
  mergeParams: true
});

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
    const newProject = await projectsDb.insert(req.body);
    res.json(newProject);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const project = await projectsDb.get(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Project not found"
      });
    } else {
      const project = await projectsDb.get(req.params.id);
      if (!project) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
    }

    const updatedProject = await projectsDb.update(req.params.id, req.body);
    res.status(201).json(updatedProject);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Project not found"
      });
    } else {
      const project = await projectsDb.get(req.params.id);
      if (!project) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
    }

    await projectsDb.remove(req.params.id);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: "Project not found"
      });
    }
    const project = await projectsDb.get(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    } else {
      const getActions = await projectsDb.getProjectActions(req.params.id);
      res.json(getActions);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
