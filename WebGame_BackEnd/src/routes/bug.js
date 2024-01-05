const express = require('express');
const { fetchBugReport, dummyBug, updateBug, postBug, fetchBugReportWithDate } = require('../controllers/bug');
const { updateUser } = require('../controllers/user');
const router = express();

// GET
router.get("/fetchBugsReport", fetchBugReport);
router.get("/fetchBugsReport/:status", fetchBugReport);
router.get("/fetchBugsReportWithDate/:status", fetchBugReportWithDate);
router.get("/fetchBugsReportWithDate", fetchBugReportWithDate);

// POST
router.post("/dummyBug", dummyBug);
router.post("/postBug", postBug);

// PUT
router.put("/updateUser", updateUser);
router.put("/updateBug/:_id", updateBug);

module.exports = router;