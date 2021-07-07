const mongoose= require("mongoose")
const Schema = mongoose.Schema;
const appointMentSchema = new mongoose.Schema({
    assignTo:{
        type: Schema.Types.ObjectId, ref :'User'
    
    },
    assignBy:{
          type:Schema.Types.ObjectId, ref :'User'
    },
    time:{
        type:String
    }
})
module.exports = mongoose.model("Appointment", appointMentSchema)