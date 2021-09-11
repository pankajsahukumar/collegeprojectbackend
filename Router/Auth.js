const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
router.post('/Login',(req,res,next)=>{
  passport.authenticate('local',(err,user)=>{
    if(err)
    throw err;
    if(!user)
    return res.json("wrong");
      const token = jwt.sign(user.toJSON(),"this is pankaj");
    req.logIn(user,err=>{
      if(err)
      throw err;
      console.log(user);
      res.json({token:token});
    })
  })(req,res,next);
  
});

router.post('/register',async(req,res)=>{
  const {email,password}=req.body;
  try{
    const checkexist = await User.findOne({email:email});
    const data =await bcrypt.hash(password,10);
    if(checkexist){
      return res.json("user exist");
    }else{
      const usersave = new User({email:email,password:data});
      console.log(usersave)
      const detail = await usersave.save();
      return res.json({"message":"successfully","user":detail});
    }
  }catch(err){
    return res.json({"error":err});
  }
});
module.exports = router;
