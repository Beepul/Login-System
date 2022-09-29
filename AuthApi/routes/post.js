const router = require('express').Router();
const Post = require("../model/Post");
const { verifyToken,verifyTokenAndAdmin } = require("./verifyToken");

router.post("/createPost", verifyToken, async (req,res) => { 
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(error){
        res.status(500).json(error);
    }
});

router.delete("/deletePost/:id", verifyTokenAndAdmin, async (req,res) => { 
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted");
    }catch(error){
        res.status(400).json(error);
    }
})
module.exports = router;