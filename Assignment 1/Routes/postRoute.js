const express = require('express');
const Post = require('../model/Post.js');
const router = express.Router();


router.post('/blog', async (req,res) => {
    const {title, content, author} = req.body;

    try{
        const post = new Post({title, content, author});
        await post.save();
        res.status(200).json({message : "Blog Post Saved Successfully..."})

    }catch(error){
        res.status(400).json({message : "Error While Saving Blog Post"})
    }
})

module.exports = router;