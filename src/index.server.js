const express = require("express")
const env = require("dotenv");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
// routers users
const authRoutes = require('./routes/auth');
const appointment = require('./routes/appointment')

const path = require('path')

 
env.config();

mongoose.connect(
   ` mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fuodx.mongodb.net/${process.env.MONDO_DB_DATATBASE }?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
        console.log("DATABASE CONNECTED SUCCESSFULLY");
        
    }
    )
    .catch(err => console.log(err));


//mongo db connection 
// mongodb+srv://root:<password>@cluster0.fuodx.mongodb.net/<dbname>?retryWrites=true&w=majority

app.use(cors());
app.use( express.json());

app.use('/api', authRoutes);
app.use('/api',appointment)




app.listen(process.env.PORT, ()=>{console.log(`SERVER IS RUNNINGN ON ${process.env.PORT}`);});