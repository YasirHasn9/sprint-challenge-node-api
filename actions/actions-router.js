const express = require("express");
const actionsDb = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const actions = await actionsDb.get();
  res.json(actions);
});

router.post("/", async (req, res, next) => {
  try {
    let data = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    };
    if (!data.project_id ||
         !data.description ||
         !data.notes) {
      return res.status(401).json({
        message: "project_id, description & notes should be all filled in"
      });
    }
    const newAction = await actionsDb.insert(data);
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
