
const express = require("express");
const { createappointment, getappointment, getmyappointment, finishappointment } = require("../controller/appointment");
const appointment = require("../models/appointment")

const router = express.Router();
router.post("/appointment/add", createappointment )
router.get("/appointment",  getappointment )
router.get("/myappointment",  getmyappointment )
router.get("/appointment/{{id}}/finish",  finishappointment )

module.exports = router;