const express = require("express");
const router = express();

const { dummyData, getAllAnnouncement, getLatestAnnouncement, insertAnnoucement } = require('../controllers/announcement');

router.post("/fetchAnnouncement", dummyData);
router.post("/insertAnnoucement", insertAnnoucement);

router.get("/fetchAnnouncement", getAllAnnouncement)
router.get("/fetchLatestAnnouncement", getLatestAnnouncement)

module.exports = router;