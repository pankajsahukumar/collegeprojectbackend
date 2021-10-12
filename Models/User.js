const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
email:{
    type:String,
    required:true,
},password:{
    type:String,
    required:true
},
coverimg:{
    type:String,
},
profilepic:{
    type:String,
},
type:{
 type:Boolean,
 default:false,
},posts:{
    type:Array,
}},{timestamps:true});
const user =module.exports = mongoose.model("User",userSchema);