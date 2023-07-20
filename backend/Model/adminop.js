const mongoose=require('mongoose');
const adminSchema=mongoose.Schema({
    username:String,
    password:String
})
const adminModel=mongoose.model("admins",adminSchema);
module.exports=adminModel;