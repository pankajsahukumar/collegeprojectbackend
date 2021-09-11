const mongoose = require('mongoose');
const commentModel = require('./commentModel');
const postSchema = new mongoose.Schema({
userId:{type:String,
required:true},
    postdes:{
    type:String,
    required:true
},
imgurl:{
    type:String,
},
postlike:{
    type:Array,
},
postcomment:[{type:mongoose.Types.ObjectId,ref:commentModel}]},
{timestamps:true});


const post =module.exports = mongoose.model("Post",postSchema);