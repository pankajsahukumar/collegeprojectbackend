const express = require('express');
const app = express();
const userrouter = require('./Router/userroute');
const authrouter = require('./Router/Auth');
const postroute = require('./Router/Postroute');
const initializepassport = require('./authenticate');
const commentrouter = require('./Router/CommentRouter');
const conversationrouter = require('./Router/CoversationRouter');
const chatrouter = require('./Router/chatRouter');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const path = require('path');
initializepassport(passport);

require("./dp/dbconn");
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
    cb(null,req.body.name);
    },
})
const upload = multer({storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
    try{
        return res.status(200).json("file uploaded");
    }catch(err){
        console.log(err);
    }
});
app.use('/images',express.static(path.join(__dirname,'public/images')));
app.use('/user',userrouter);
app.use('/Auth',authrouter);
app.use('/post',postroute);
app.use('/comment',commentrouter);
app.use('/coversation',conversationrouter);
app.use('/Chat',chatrouter);
app.listen(8000,()=>{
    console.log("server is running");
});