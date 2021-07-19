
const express = require("express");
const { createappointment, getappointment, getmyappointment, finishappointment, getmyappointmentuser, pendingappointment, cencelappointment } = require("../controller/appointment");
const appointment = require("../models/appointment")

const router = express.Router();
router.post("/appointment/add", createappointment )
router.post("/appointment/pending", pendingappointment )

router.get("/appointment",  getappointment )
router.get("/myappointment",  getmyappointment )
router.get("/myappointment/user",  getmyappointmentuser )
router.get("/appointment/:id/finish",  finishappointment )
router.get("/appointment/:id/cencel",  cencelappointment )
router.post("/appointment/:id/accept",  cencelappointment )

module.exports = router;