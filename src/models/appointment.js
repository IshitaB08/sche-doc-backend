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
    },
    done:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("Appointment", appointMentSchema)