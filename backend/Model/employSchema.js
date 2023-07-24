const { default: mongoose, now } = require("mongoose");
const empSchema=mongoose.Schema({
    
    username:String,
    password:String,
    designation:String,
    email:String,
    createdAT:{
        type:Date,
        default:Date.now
               }
               

}) 
 const empModel=mongoose.model('employee',empSchema);
 module.exports=empModel;