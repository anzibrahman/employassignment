const express= require ('express');
const app= new express();

const cors=require('cors');
app.use(cors());

require('dotenv').config();
const morgan=require("morgan");

app.use(morgan('dev'));
const mongoose=require('mongoose'); 
const url= process.env.url;

mongoose.connect(url)
.then(()=>{
    console.log('Connected to Atlas db');
})
.catch(()=>{
    console.log('error in connecting Atles');
})

const userapi=require('./routes/userRoutes')
app.use('/api',userapi);

const admnapi=require('./routes/adminRoutes')
app.use('/api',admnapi)

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`SERVER IS LISTENING IN THE PORT  ${PORT}`)
})

