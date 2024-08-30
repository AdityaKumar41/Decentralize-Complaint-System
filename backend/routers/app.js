const express = require("express");
const { getComplaints, setComplaints } = require("../controller/app");
const router = express.Router();

router.post("/", setComplaints);
router.get("/", getComplaints);

module.exports = router;
