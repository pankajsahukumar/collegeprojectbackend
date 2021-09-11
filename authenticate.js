const localStatergy = require('passport-local').Strategy;
const User = require('./Models/User');
const bcrypt = require('bcryptjs');
const jwtstatergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt =require('jsonwebtoken');
const passport = require('passport');
module.exports=function initialize(passport){
    const authenticateUser =async(email,password,done)=>{
        const user=await User.findOne({email:email});
        if(!user){
            return done(null,false);
        }else{
            try{
                const ismatch = await bcrypt.compare(password,user.password);
                if(ismatch){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            }catch(err)
            {return done(err);}
        }
  
    }
    
     
    passport.use(new localStatergy({usernameField:"email"},authenticateUser));
    passport.serializeUser((user,cb)=>{ 
  cb(null,user.id);
    });
  passport.deserializeUser((id,cb)=>{
    User.findOne({_id:id},(err,user)=>{
    cb(err,user);

    });
  });
  const opts={};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
    opts.secretOrKey="this is pankaj";
  passport.use(new jwtstatergy(opts,(jwt_payload,done)=>{
    console.log(jwt_payload);
    User.findById(jwt_payload._id,(err,user)=>{
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));
}

