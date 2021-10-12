const Router = require('express').Router();
const  bcrypt = require('bcryptjs');
const User = require('../Models/User');

Router.get("/",async(req,res)=>{
    const userId =req.query.userId;
    const username=req.query.username;
    try{
        let data;
        if(userId)
        {
            data = await User.findById(userId);
        }else
        {
            data = await User.findOne({Username:username});
        }
        const {password,updateAt,...other} =data._doc;
        res.status(200).json(other); 
    }catch(err){
        res.status(500).json(err);
    }
})

Router.put('/change',async(req,res)=>{
    try{
     const check = await User.findOne({email:req.body.email});
     if(!check){
         return res.json("wrong username");
     }else{
         const ismatch= await bcrypt.compare(req.body.password,check.id);
         if(!ismatch)
         {
          return res.json("not match");
         }else{
             const password = await bcrypt.hash(req.body.cpassword,10);
             await User.findOneAndUpdate({_id:check.id},{$set:{password:password}});
         }
     }
    }catch(err){
        res.json({"error":err});
    }
});


module.exports = Router;