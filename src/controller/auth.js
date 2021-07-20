const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult}= require('express-validator');
const { json } = require('body-parser');
const jwt_decode = require("jwt-decode");
const emailjs = require('emailjs')
const nodemailer = require('nodemailer'); 
getTokenDetails = (req) => {
    var token = req.headers.authorization
    return jwt_decode(token);
}

exports.getUser=(req,res)=>{
    User.find().exec((error, user)=>{
        if(user) return res.status(200).json({
            data:user
        })
    })
}
exports.getUserbyid=(req,res)=>{
    User.findOne({_id:req.headers.id}).exec((error, user)=>{
        if(user) return res.status(200).json({
            data:user
        })
        if(error){
            return res.status(400).json({
                error:error
            })
        }
    })
}
exports.getAdmin=(req,res)=>{
    User.find({role:'admin'}).exec((error, user)=>{
        if(user) return res.status(200).json({
            data:user
        })
    })
}

exports.signup =(req,res)=>{


    User.findOne({email: req.body.email } )
    .exec((error,user) => {
      if(user) return res.status(400).json({
          message: 'user already registered'
      });

      const {
          fullname, 
       
          email,
          password,
          role
        
      } = req.body;
      const _user = new User({
        fullname, 
        role,
        email,
        password,
        contactnumber: Math.random()
        });

      _user.save((error,data)=>{
  if(error){ 
      return res.status(400).json({
      massage:"something went wrong"
  });
  }
   if(data){
    mailjs.send("service_uyiwysj","template_qhq01lq");
    const token= jwt.sign({ _id : data._id, role:data.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
       return res.status(201).json({
           massage: "User Created Successfully...!",
           data:data,
           token:token
       })
   }
  });

      });
}

exports.signin =(req,res) =>{
 User.findOne({email: req.body.email})
 .exec((error, user)=>{
     if(error){
         return res.status(400).json({ error});}
          if(user){
            if(user.password===req.body.password){
               const token= jwt.sign({ _id : user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
               const {
                   _id,
                firstname,
                   lastname, 
                   email, role
               }= user;
               res.status(200).json({
                   token,
                   user:{
                       _id, firstname, lastname, email, role
                   }
               });
               
            }
            else{
                return res.status(400).json({
                    message:'invaid password'
                })
            };
         }
         else{
             return res.status(400).json({
                 message: 'something wrong // user not found'
             })
         }
     
 })
}
exports.getUserData =(req, res) => {
    var userDetails = getTokenDetails(req)
    console.log(userDetails)
    User.findOne({ _id: userDetails._id }).exec((error,data)=>{
        if(error){
            return res.status(400).json({ error});}
            if(data){
            return res.status(200).json({ data});}

        
    })
    
}

exports.completeprofile=(req,res)=>{
    const { location, scope, admintiming }= req.body;
 
    const userDetaild = getTokenDetails(req)
        User.updateOne({_id: userDetaild._id} , { location:location, scope:scope,admintiming:admintiming } ).exec((error,data)=>{
            if(error){
            return res.status(400).json({ error});}
            if(data){
                return res.status(200).json({ data});}
            
        })

}
exports.completeprofileClient=(req,res)=>{
    const { age, gender, weight, height, allergies, medicalhistory }= req.body;
    const data={ age, gender, weight,height, allergies, medicalhistory };
 
    const userDetaild = getTokenDetails(req)
        User.updateOne({_id: userDetaild._id} , { clientDetails : data } ).exec((error,data)=>{
            if(error){
            return res.status(400).json({ error});}
            if(data){
                return res.status(200).json({ data});}
            
        })

}

exports.updateslots =(req,res)=>{
    const {slots,id} = req.body;
    User.updateOne({_id: id}, {allslots: slots}).exec((error, data)=>{
          if(error){
            return res.status(400).json({ error: error});
        }
            if(data){
                return res.status(200).json({data: data});}
})
}

