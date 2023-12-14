const express = require("express");
const router = express();

const { dummyData, getAllAnnouncement, getLatestAnnouncement } = require('../controllers/announcement');

router.post("/fetchAnnouncement", dummyData);
router.get("/fetchAnnouncement", getAllAnnouncement)
router.get("/fetchLatestAnnouncement", getLatestAnnouncement)

module.exports = router;