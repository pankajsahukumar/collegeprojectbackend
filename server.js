const express = require('express');
const app = express();
const userrouter = require('./Router/userroute');
const authrouter = require('./Router/Auth');
const postroute = require('./Router/Postroute');
const initializepassport = require('./authenticate');
const commentrouter = require('./Router/CommentRouter');
const conversationrouter = require('./Router/CoversationRouter');
const passport = require('passport');
initializepassport(passport);

require("./dp/dbconn");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use('/user',userrouter);
app.use('/Auth',authrouter);
app.use('/post',postroute);
app.use('/comment',commentrouter);
app.use('/coversation',conversationrouter);
app.listen(3000,()=>{
    console.log("server is running");
});