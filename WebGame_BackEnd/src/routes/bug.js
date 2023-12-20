const express = require('express');
const { fetchBugReport } = require('../controllers/bug');
const router = express();

// GET
router.get("/fetchBugsReport", fetchBugReport);

module.exports = router;