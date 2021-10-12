const router = require('express').Router();
const postmodel = require('../Models/PostModel');
router.get('/allpost',async(req,res)=>{
   try{
       const posts = await postmodel.find();
       return res.json(posts);
   }catch(err){
       return res.json(err);
   }
});

router.post('/createpost',async(req,res)=>{
   try{
    const savepost = new postmodel(req.body);
    const sa=await savepost.save();
    return res.json(sa);
   }catch(err){
       return res.json(err);
   }
});
router.put('/:id/like',async(req,res)=>{
    const {userId}=req.body;
    console.log(userId);
   try{
       const getpost = await postmodel.findById(req.params.id);
       if(getpost.postlike.includes(userId)){
           const pdate= await getpost.updateOne({$pull:{postlike:userId}});
           return res.json({"message":"post not like","updata":pdate});
       }else{
       const update= await getpost.updateOne({ $push: {postlike:userId } } );
       
    return res.json({"message":"post Like","updata":update});}
    
   }catch(err){
       return res.json(err);
   }
});
router.get('/:id/allpost',async(req,res)=>{
    try{
    const allpost=  await postmodel.find({userId:req.params.id});
    if(allpost){
        return res.json(allpost);
    }else{
        return res.status(500).json("error");
    }
    }catch(err){return res.json(err);}
});
router.get('/:id',async(req,res)=>{
    try{
        const data=await postmodel.findById(req.params.id);
        return res.json(data);
    }catch(err){
        return res.json(err);
    }
});
router.put('/update',async(req,res)=>{
    try{
        const update = new postmodel(req.body);
       const data=await update.save();
       return res.json(data);
    }catch(err){
        return res.status(500).json(err);
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const findpost = await postmodel.findById({_id:req.params.id});
        if(findpost.userId===req.body.userId){
            const re=await findpost.delete();
            return res.status(200).json("done");
        }else{
            return res.status(400).json("not done");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});
module.exports = router;