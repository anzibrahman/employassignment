const express=require('express');
const EmployModel=require('../Model/userData');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.post('/createmply', async(req,res)=>{
    let savData=await EmployModel(req.body.data);
    console.log(savData);
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
        if(decoded&&decoded.email){
            savData.save()
            console.log(savData)
            res.json({message:"svaed successfully"})
        }
        else{
            res.json("unauthorized user");
        }
    })
})



router.post('/delete/:id',async(req,res)=>{
    try{
        let postid=req.params.id;
        console.log(postid);
    console.log(req.body.token);
    await EmployModel.findByIdAndDelete(postid);
    jwt.verify(req.body.token,"employeeapp",
    (eror,decoded)=>{
        if(decoded && decoded.email){
            console.log("deleted");
            res.json({message:"deleted successfully"});
        }
    })
    
    
    }catch(error){
        res.json({message:"error in deleting"});
    }
})

router.post('/update/:id',async(req,res)=>{
    let id=req.params.id;
    let data=req.body;
    console.log(id);
    let updated=await EmployModel.findByIdAndUpdate(id,req.body);
    updated.save();
    console.log("updated");
    res.json({message:"updated"})
})

//  viewpost
router.post('/viewemp', async(req,res)=>{
     let item=req.body;
     console.log(item);
     let newitem= await EmployModel.find()
     jwt.verify(req.body.token,"employeeapp",
     (error,decoded)=>{
       if (decoded&&decoded.email) {
         
          res.json({message:"user" ,newitem});
       } else {
         res.json({message:"unautherised request"})
       }
     })
     
})
 //   viewpostadmin
 router.post('/viewallemp', async(req,res)=>{
   let item=req.body;
   console.log(item);
   let newitem= await EmployModel.find()
   jwt.verify(req.body.token,"employeeapp",
   (error,decoded)=>{
     if (decoded && decoded.email) {
       
        res.json({message:"admin" ,newitem});
     } else {
       res.json({message:"unautherised request"})
     }
   })
   
})

module.exports=router;
