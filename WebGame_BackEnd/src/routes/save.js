const express = require("express");
const router = express();
const {save, load} = require("../controllers/save");

// POST
router.post("/save/:user_id", save)
router.get("/load/:user_id", load)

module.exports = router;