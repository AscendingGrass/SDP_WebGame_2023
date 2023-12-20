const express = require("express");
const router = express();
const {save} = require("../controllers/save");

// POST
router.post("/save/:user_id", save)

module.exports = router;