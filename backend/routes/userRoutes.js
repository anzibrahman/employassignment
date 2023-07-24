const express=require('express');
const jwt=require('jsonwebtoken');

const empModel = require('../Model/employSchema');
const admModel = require('../Model/admincred');
const router= express.Router();
const cors=require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.post('/login', async(req,res)=>{
   
    let username=req.body.username;
    let password=req.body.password;
     let user= await empModel.findOne({username:username})
      if (!user) {
              let admin=await admModel.findOne({username:username})
            // if admin
              if (admin) {
                if( password==admin.password){
                  jwt.sign({email:username,id:admin._id},"employeeapp",{expiresIn:"1d"},
                  (error,token)=>{
                    if (error) {
                      res.json({message:"token not generated"});
                      } else {
                        console.log(admin);
                       res.json({message:"admin",token:token,data:admin});
                      }
                  })
                }
                else{
                    res.json({message:"unauthorised login"});
                  }
              }
            else{
              res.json({message:"unauthorised login"});
            }

      }           
      else{      
                 // user
             if(user.password==password) {
              jwt.sign({email:username,id:user._id},"employeeapp",{expiresIn:"1d"},
              (error,token)=>{
                if (error) {
                  res.json({message:"token not generated"});
                  } else {
                    console.log(user);
                   res.json({message:"user",token:token,data:user});
                  }
              })
          
            }              
 else {
            res.json({message:"unauthrsed login"})
              }
          }
})  



module.exports=router;