const express = require("express");
const mockData = require("./db.mock.json");

const router = express.Router();

router.get("/:id", function(req, res, next) {
  const data = mockData.affordability.find(({ id }) => id === Number(req.params.id));
  if (data) {
    const {id, ...rest} = data;
    res.json(rest);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
