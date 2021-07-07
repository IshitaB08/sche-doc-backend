
const express = require("express");
const { createappointment, getappointment } = require("../controller/appointment");
const appointment = require("../models/appointment")

const router = express.Router();
router.post("/appointment/add", createappointment )
router.get("/appointment",  getappointment )

module.exports = router;