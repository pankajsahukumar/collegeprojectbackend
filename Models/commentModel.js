const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    postmessage:{
        type:String,
        required:true
    }
},{timestamps:true});

const comment = module.exports =mongoose.model("Comment",commentSchema);