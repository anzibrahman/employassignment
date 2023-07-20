const mongoose=require('mongoose');
const EmployeSchema=mongoose.Schema({
  Name:{
    type:String,
    required:true,
  },
  Emailid:{
    type:String,
    required:true,
  },
  Designation:{
    type:String,
    required:true,
  },
  Phone:{
    type:Number,
    required:true,
  },
  Username:{
    type:String,
    required:true,
  },
  Password:{
    type:String,
    required:true,
  },

    
});
const EmployModel=mongoose.model("employee",EmployeSchema);
module.exports=EmployModel;