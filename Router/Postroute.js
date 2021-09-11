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
   const {userId,postdes,imagurl} = req.body;
   try{
    const savepost = new postmodel({userId:userId,postdes:postdes,imgurl:imagurl});
    const sa= await savepost.save();
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
       console.log(getpost);
       if(getpost.postlike.includes(userId)){
           const pdate= await getpost.updateOne({$pull:{postlike:userId}});
           return res.json({"message":"post","updata":pdate});
       }else{
       const update= await getpost.updateOne({ $push: {postlike:userId } } );
       
    return res.json({"message":"post Like","updata":update});}
    
   }catch(err){
       return res.json(err);
   }
});

module.exports = router;