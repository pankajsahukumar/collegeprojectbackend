const mongoose =require("mongoose");

const MessageSchema=new mongoose.Schema({
    ConversationId:{type:mongoose.Types.ObjectId,ref:'Conversation'},
    SenderId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
    }
},{timestamps:true});

const message = module.exports=mongoose.model('message',MessageSchema);