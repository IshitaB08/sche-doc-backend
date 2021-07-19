const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userschema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        min:3,
        max:20,
        trim:true,
    },
    lastname:{
        type: String,
    
        min:3,
        max:20,
        trim:true,
    },
    appointments:[{
          type:Object
    }],
    role:{
type:String,
enum: ['admin','user'],
default:'user'
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    admintiming:{
        type:String
    },
    password:{
        type:String,
        required:true, 
     },
   details:{
       type:Object
   },
   allslots:[{
           type:Object
   }],
   location:{
       type:String
   },
   scope:{
       type:String
   },
    contactnumber:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean
    },
    clientDetails:{
        type:Object
    }
}, {
    timestamps:true,
}
);


// userschema.virtual('password')
// .set(function(password){ 
//     this.hash_password = bcrypt.hashSync(password,10);
// });

// userschema.methods= {
//     authenticate: function(password){
//         return bcrypt.compareSync(password, this.hash_password);
//     }
// }

module.exports = mongoose.model('User', userschema)
