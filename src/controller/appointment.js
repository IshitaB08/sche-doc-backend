const Appointment = require("../models/appointment")

exports.createappointment=(req,res)=>{
    const { assignTo, assignBy,time} = req.body;
    const _appointment= new Appointment({
        assignBy, assignTo, time
    })
    _appointment.save((error, data)=>{
        if(error){
            return res.status(400).json({
                message:"something went wrong"
            });
        }
        if(data){
            return res.status(201).json({
                massage: "Appointment Created...!"
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