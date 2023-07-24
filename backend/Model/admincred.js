const mongoose=require('mongoose');
const adminSchema=mongoose.Schema({
    username:String,
    password:String
})
const admModel=mongoose.model("admins",adminSchema);
module.exports=admModel;