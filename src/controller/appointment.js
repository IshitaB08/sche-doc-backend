const Appointment = require("../models/appointment")
const User = require("../models/User")
const jwt_decode = require("jwt-decode");

getTokenDetails = (req) => {
    var token = req.headers.authorization
    return jwt_decode(token);
}


exports.createappointment=(req,res)=>{
    const { assignTo, assignBy,slot, details} = req.body;
    const _appointment= new Appointment({
        assignBy, assignTo, slot, details
    })
    _appointment.save((error, data)=>{
        if(error){
            return res.status(400).json({
                message:"something went wrong"
            });
        }
        if(data){
             User.updateOne({_id : data.assignTo}, {available:false}).exec((err,dat)=>{
               if(err){
                return res.status(400).json({
                    message:"something went wrong"
                });
               }
               if(dat){
               return res.status(201).json({
                massage: "Appointment Created...!",
                data:data})
               }
             })
                 
             
          
        }
    })

}
exports.getappointment=(req,res)=>{
     Appointment.find().exec((error, user)=>{
        if(user) return res.status(200).json({
            data:user
        })
  
    })   

}
exports.getmyappointment=(req,res)=>{
    var userDetails = getTokenDetails(req)
    Appointment.find({assignTo:userDetails._id}).exec((error, user)=>{
       if(user) return res.status(200).json({
           data:user
       })
       if(error) {
           return res.status(400).json({
               error:error
           })
       }
   })

}
exports.finishappointment=(req,res)=>{
    const id = req.params.id;
    Appointment.updateOne({_id:id}, { done:true }).exec((error,data)=>{
        if(error) return res.status(400).json({
            data:error
        })
        if(data){
            return res.status(200).json({
                data:data
            })
        }
    })
}