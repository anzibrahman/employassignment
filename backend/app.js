const express=require("express");
const morgan=require("morgan");
const cors=require('cors');
const app= new express();
require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());


const mongoose=require('mongoose'); 
const url= process.env.url;

mongoose.connect(url)
.then(()=>{
    console.log('Connected to Atlas db');
})
.catch(()=>{
    console.log('error in connecting Atles');
})



const userapi=require('./routes/employRoute')
app.use('/api',userapi);

const admnapi=require('./routes/adminRoute')
app.use('/api',admnapi)

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})