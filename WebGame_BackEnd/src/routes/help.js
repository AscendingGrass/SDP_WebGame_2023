const express = require("express");
const router = express();

const { postHelp } = require('../controllers/help');

router.post("/help", postHelp);

module.exports = router;