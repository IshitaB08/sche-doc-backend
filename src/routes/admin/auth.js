const { Router } = require("express");
const express = require("express");
const { isRequestvalidated, requireSignin } = require("../../common-middleware");
const { signup, signin,  signout } = require("../../controller/admin/auth");
const user = require("../../models/user");
const { Validatesignuprequest, Validatesigninrequest } = require("../../validators/auth");
const router = express.Router();


router.post('/admin/signin',Validatesigninrequest, isRequestvalidated, signin);

router.post('/admin/signup',Validatesignuprequest, isRequestvalidated,  signup);

router.post('/admin/signout',  signout)

module.exports = router;