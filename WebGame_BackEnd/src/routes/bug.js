const express = require('express');
const { fetchBugReport, dummyBug, updateBug, postBug } = require('../controllers/bug');
const router = express();

// GET
router.get("/fetchBugsReport", fetchBugReport);
router.get("/fetchBugsReport/:status", fetchBugReport);

// POST
router.post("/dummyBug", dummyBug);
router.post("/postBug", postBug);

//
router.put("/updateBug/:_id", updateBug);

module.exports = router;