const mongoose= require("mongoose")
const Schema = mongoose.Schema;
const appointMentSchema = new mongoose.Schema({
    assignTo:{
        type: Schema.Types.ObjectId, ref :'User'
    
    },
    assignBy:{
          type:Schema.Types.ObjectId, ref :'User'
    },
    slot:{
        type:String
    },
    details:{
        type:String
    }
})
module.exports = mongoose.model("Appointment", appointMentSchema)