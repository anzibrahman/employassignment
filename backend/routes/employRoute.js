const express=require("express");
const jwt=require('jsonwebtoken');
const router=express.Router();
const EmployModel=require("../Model/userData");
const adminModel=require("../Model/adminop");
const cors=require('cors');
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post("/login",async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let use=await EmployModel.findOne({username:username})
    if(!user){
        let admin=await adminModel.findOne({username:username})
        if(admin){
            if(password==admin.pasword){
                jwt.sign({email:username,id:admin._id},"employeeapp",{expiresIn:"Id"},
                (error,token)=>{
                    if(error){
                        res.json({message:"token not generated"});
                    }else{
                        console.log(admin);
                        res.json({message:"admin",token:token,data:admin});
                    }
                } )
            }
            else{
                res.json({message:"unautorized login"});
            }

        }
        else{
            res.json({message:"authorized login"});
        }
    }
    else{
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"employeeapp",{expiresIn:"Id"},
            (error,token)=>{
                if(error){
                    res.json({message:"token not generated"});
                }else{
                    console.log(user);
                    res.json({message:"user",token:token,data:user});
                }
            })
        }
        else{
            res.json({message:"unauthorized login"})
        }
    }
})
   module.exports=router;