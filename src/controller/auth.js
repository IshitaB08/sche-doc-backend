
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult}= require('express-validator');
const { json } = require('body-parser');
const jwt_decode = require("jwt-decode");
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

exports.signup =(req,res)=>{


    User.findOne({email: req.body.email } )
    .exec((error,user) => {
      if(user) return res.status(400).json({
          message: 'user already registered'
      });

      const {
          firstname, 
          lastname,
          email,
          password,
          role
        
      } = req.body;
      const _user = new User({
        firstname, 
        role,
        lastname,
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
       return res.status(201).json({
           massage: "User Created Successfully...!"
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
            if(user.authenticate(req.body.password)){
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


