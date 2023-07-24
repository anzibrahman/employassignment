const express=require('express');
const empModel = require('../Model/employSchema');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// post
router.post('/createmply', async(req,res)=>{
   
      
    let savedata= await empModel(req.body.data);
    console.log(savedata);
    jwt.verify(req.body.token,"employeeapp",
    (error,decoded)=>{
      if (decoded && decoded.email) {
         savedata.save()
         console.log(savedata)
        res.json({message :" saved succesfully "})
      } else {
         res.json("unautherised user"); 
      }
     
    })
    
 
})

// delete
 
router.post('/delete/:id', async (req,res)=>{
   try {
      let postid=req.params.id;
      
      console.log(postid);
      console.log(req.body.token);
       await empModel.findByIdAndDelete(postid);
      jwt.verify(req.body.token,"employeeapp",
      (error,decoded)=>{
      if (decoded && decoded.email) {
          
        console.log("deleted");
         res.json({message:"deleted successfully"});
        

      } })
      
   } catch (error) {
      res.json({message:"error in deleting"});
   }
  
})

// update || put
router.post('/update/:id', async (req,res)=>{
   let id=req.params.id;
   let data=req.body;
   console.log(id);
   let updted= await empModel.findByIdAndUpdate(id,req.body);
   updted.save();
   console.log("updated");
   res.json({message:"updated"})
})

 
// viewpost
router.post('/viewemp', async(req,res)=>{
     let item=req.body;
     console.log(item);
     let newitem= await empModel.find()
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
   let newitem= await empModel.find()
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