const router = require('express').Router();
const messagemodel = require('../Models/MessageModel');
router.get("/:conversationId",async(req,res)=>{
   try{
    const message = await messagemodel.find({ConversationId:req.params.conversationId});
    console.log(message);
    res.status(200).json(message);
   } catch(err){
       res.status(500).json(err);
   }
});
router.post('/',async(req,res)=>{
    console.log(req.body);
    try{
    const newmessage = new messagemodel(req.body);
    const savenewmessage = await newmessage.save();
    res.status(200).json(savenewmessage);
    }catch(err)
    {
        res.status(500).json(err);
    }
})
module.exports = router;