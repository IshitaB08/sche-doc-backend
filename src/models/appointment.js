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
        type:Object
    },
    details:{
        type:String
    },
    done:{
        type:String,
        default:'false'
    }
})
module.exports = mongoose.model("Appointment", appointMentSchema)