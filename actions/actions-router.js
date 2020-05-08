const express = require("express");
const actionsDb = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const actions = await actionsDb.get();
  res.json(actions);
});


module.exports = router;
