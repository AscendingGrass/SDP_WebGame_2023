const express = require("express");
const router = express();

const { insertScoreboard, deleteScoreboard } = require("../controllers/scoreboard");

// POST
router.post("/insertScoreboard/:user_id", insertScoreboard);

// PUT
router.put("/updateScoreboard")

// DELETE
router.delete("/deleteScoreboard/:user_id", deleteScoreboard);

module.exports = router;