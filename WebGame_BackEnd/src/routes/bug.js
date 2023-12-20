const express = require('express');
const { fetchBugReport, dummyBug, updateBug } = require('../controllers/bug');
const router = express();

// GET
router.get("/fetchBugsReport", fetchBugReport);
router.get("/fetchBugsReport/:status", fetchBugReport);

// POST
router.post("/dummyBug", dummyBug);

//
router.put("/updateBug/:_id", updateBug);

module.exports = router;