const express = require("express");
const router = express();

const { insertScoreboard, deleteScoreboard } = require("../controllers/scoreboard");

// POST
router.post("/insertScoreboard", insertScoreboard);

// DELETE
router.delete("/deleteScoreboard", deleteScoreboard);

module.exports = router;