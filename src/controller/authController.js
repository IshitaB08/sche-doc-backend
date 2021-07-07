
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult}= require('express-validator');
const { json } = require('body-parser');



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
          password
        
      } = req.body;
      const _user = new User({
        firstname, 
        lastname,
        email,
        password,
        contactnumber: Math.random()
        });

      _user.save((error,data)=>{
  if(error){ 
      return res.status(400).json({
      massage:"somethingfdg went wrong"
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
                   email
               }= user;
               res.status(200).json({
                   token,
                   user:{
                       _id, firstname, lastname, email
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

