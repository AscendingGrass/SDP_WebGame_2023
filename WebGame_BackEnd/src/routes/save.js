const express = require("express");
const router = express();

// POST
router.post("/save/:user_id", save)

module.exports = router;