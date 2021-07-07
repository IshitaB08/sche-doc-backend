const {  validationResult } =require('express-validator');
const jwt = require('jsonwebtoken');


exports.isRequestvalidated=(req, res, next)=>{
    const error = validationResult(req)
    if(error.array().length > 0){
        return res.status(400).json({
            error: error.array()[0].msg
        })
    }
    next();
}


exports.requireSignin = (req,res,next) =>{
    
  if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1] ;
    const user =jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
  
  }
  else{
         return res.status(400).json({
        message:"authorization required"
    })
  }
 
    next();
}; 

exports.userMiddleware=(req,res,next)=>{
    if(req.user.role !== "user"){
        return res.status(400).json({message :"user access denied \\ only admin can accesss this"})
    }
    next();

};


exports.adminMiddleware=(req,res,next)=>{
      if(req.user.role !== "admin"){
          return res.status(400).json({message :" admin access denied \\ only admin can accesss this"})
      }
      next();

};
