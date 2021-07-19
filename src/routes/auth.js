const { Router } = require("express");
const express = require("express");
const { isRequestvalidated } = require("../common-middleware");
const { signup, signin, requireSignin, getUser, getUserData, completeprofile, getAdmin, getUserbyid, completeprofileClient, updateslots } = require("../controller/auth");

const { Validatesignuprequest,  Validatesigninrequest } = require("../validators/auth");
const router = express.Router();

router.post('/signup',Validatesignuprequest,isRequestvalidated, signup);


router.post('/signin',Validatesigninrequest, isRequestvalidated, signin);
router.get("/user", getUser )
router.get("/userbyid", getUserbyid )
router.get("/user/admin", getAdmin )
router.get("/userdata", getUserData)
router.put("/completeprofile",completeprofile)
router.put("/completeprofileClient",completeprofileClient)
router.post("/updateslots", updateslots)


// router.post('/profile' , requireSignin, (req, res)=>{
//     return res.status(200).json({
//         message:"profile"
//     });
// });
module.exports = router;