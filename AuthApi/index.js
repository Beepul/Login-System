const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Import routers
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

//Connecting to mongodb compass
mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB CONNECTION SUCESS"); 
}).catch(err=>{
    console.log(err.message);
}); 

app.use(cors());
//Router Middlewares
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);


var port = process.env.PORT;
app.listen(port,()=> console.log(`Server running at : ${port}`));