const Appointment = require("../models/appointment")
const User = require("../models/User")
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