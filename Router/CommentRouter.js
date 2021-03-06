const router = require('express').Router();
const postmodel = require('../Models/PostModel');
const commentModel= require('../Models/commentModel');
router.post('/create',async(req,res)=>{ 
   try{
       console.log(req.body);
       const getpost = await postmodel.findById(req.body.postId);
       const commentsave = new commentModel(req.body);
       const result =await commentsave.save();
       const {_id,...others}= result._doc;
       await getpost.updateOne({$push:{postcomment:_id}});
       return res.json("how");
   }catch(err){
       return res.json(err);
   }
});
router.get('/:id',async(req,res)=>{
    try{
    const getcomment = await commentModel.find({postId:req.params.id});
    console.log(getcomment);
    return res.json(getcomment);
    }catch(err){
        return res.status(500).json(err);
    }
})
router.delete('/:id/comment',async(req,res)=>{
    try{
        const getpost = await postmodel.findOne({_id:req.body.id});
       const up= await commentModel.findByIdAndDelete(req.params.id);
       await getpost.updateOne({$pullAll:{postcomment:[req.params.id]}});
       return res.json("done");
    }catch(err){
        return res.json(err);
    }
});
router.put('/:id/update',async(req,res)=>{
try{
   await commentModel.findOneAndUpdate({_id:req.params.id},{$set:{postmessage:req.body.postmessage}});
   return res.json("done bro");
}catch(err){
    return res.json({"error":err});
}
});
module.exports = router;