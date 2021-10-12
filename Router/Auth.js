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
    return res.status(400).json("wrong");
      const token = jwt.sign(user.toJSON(),"this is pankaj");
    req.logIn(user,err=>{
      if(err)
      throw err;
      res.status(200).json({user:user,token:token});
    })
  })(req,res,next);
});

router.post('/register',async(req,res)=>{

  console.log(req.body);
  try{
    const checkexist = await User.findOne({email:req.body.email});
    const data =await bcrypt.hash(req.body.password,10);
    if(checkexist){
      return res.json("user exist");
    }else{
      const usersave = new User(req.body);
      const detail = await usersave.save();

      return res.json({"user":detail});
    }
  }catch(err){
    return res.json({"error":err});
  }
});
module.exports = router;
