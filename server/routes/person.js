const express = require("express");
const router = express.Router();

router.get("/:id", function(req, res, next) {
  res.json({ id: req.params.id });
});

module.exports = router;
