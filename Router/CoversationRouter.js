const router = require('express').Router();
const coversationModel = require('../Models/CoversationModel');
router.get('/:id',async(req,res)=>{
   try{
 const allconversation = await coversationModel.find({members:
    {$in:[req.params.id]}
});
return res.json(allconversation);
   }catch(err){
       res.json(err);
   }
});

router.post('/createconversation',async(req,res)=>{
 const coversation = new coversationModel({
     members:[req.body.senderId,req.body.receiverId]
 });
 try{
     const saveconversation = await coversation.save();
     if(!saveconversation){
        return  res.json("someerror occure");
     }else{
        return res.json(saveconversation);
     }
 }catch(err){
     res.json(err);
 }
});

router.delete('/:id/delete',async(req,res)=>{
  try{
      await coversationModel.deleteOne({_id:req.params.id});
      return res.json("done");
  }catch(err){
      return res.json(err);
  }
});

module.exports = router;