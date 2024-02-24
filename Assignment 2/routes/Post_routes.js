const Post = require('../models/Post_model');
const express = require('express');
const router = express.Router();


// Creating a post
// POST -: http://localhost:5000/api/blog/posts
// BODY -> raw -> JSON
// {
//      {
// "title" : "Mock Test",
// "content" : "JavaScript",
// "author" : "65d78cd6feab364be5b852e8"
// }
// }
router.post('/posts', async(req,res) => {
    try{
        const {title, content, author} = req.body;
        const newPost = new Post({title, content, author})
        await newPost.save();
        res.status(201).send({message : "Post saved successfully..."})
    }catch(error){
        console.log(error);
        res.status(501).send({message : "Error while saving post..."})
    }
   
})


// Reading a post
//GET:  localhost:5000/api/blog/posts/65d792c74353cf8a0951752d
router.get('/posts/:postId', async(req,res) => {

    const postId = req.params.postId;
    try{
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).send('Post not found');
        }
        res.json(post);
    }catch(error){
        console.log("Error While Finding Post",error);
        res.status(500).send({message : "Server Error"})
    }
});


// Updating a post
// PUT -: localhost:5000/api/blog/posts/65d792c74353cf8a0951752d
// BODY -> raw -> JSON
//  {
// "title" : "Test",
// "content" : "node express.js",
// "author" : "65d61c8f6d20e3716d7def55"
// }

router.put('/posts/:postId', async(req, res) => {
    try{
        const postId = req.params.postId;
        const {title, content} = req.body;
        const updatePost = await Post.findByIdAndUpdate(
            postId,
            {title, content},
            {new : true}
        );
        res.json(updatePost);

    }catch(error){
        console.error(error);
        res.status(500).send('Server error');
    }
})


// Deleting a post
//DELETE -: localhost:5000/api/blog/posts/65d792c74353cf8a0951752d
router.delete('/posts/:postId', async(req,res) => {
    const postId = req.params.postId;
    try{
        await Post.findByIdAndDelete(postId)
        res.send({message : "Post Deleted Successfully..."})
    }catch(error){
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// Creating a comment on a post
                                                       
// POST -:  localhost:5000/api/blog/posts/65d791384353cf8a0951752b/comments
// BODY -> row -> JSON  
    // {
    // "text":"Reach dad Poor dad",
    // "author" : "65d61c8f6d20e3716d7def55" //comment added by userId
    // }
router.post('/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { text, author } = req.body;
        const newComment = { text, author };
        const post = await Post.findById(postId);
        post.comments.push(newComment);
        await post.save();
        res.status(201).send({message : 'Comment added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
  });


// Reading comments on a post
                                                    
  router.get('/posts/:postId/comments', async (req, res) => {
        try {
            const postId = req.params.postId;
            const post = await Post.findById(postId);
            
            if (!post) {
                return res.status(404).send('Post not found');
            }

            res.json(post.comments);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
  });


// Updating a comment on a post

router.put('/posts/:postId/comments/:commentId', async (req, res) => {
    try {
      const { text } = req.body;
      const post = await Post.findById(req.params.postId);
      const comment = post.comments.id(req.params.commentId);
      comment.text = text;
      await post.save();
      res.send('Comment updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });



//Deleting comments on a post
  
router.delete('/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        // Remove the comment from the array
        post.comments.pull(comment._id);

        // Save the updated post
        await post.save();
        res.send('Comment deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Upvoting a post -: 

router.put('/posts/:postId/upvote', async (req, res) => {
    try {

        const post = await Post.findByIdAndUpdate(
                req.params.postId,
                { $inc: { upvotes: 1 } },
                { new: true }
            );
        res.json(post);

    } catch (err) {

      console.error(err);
      res.status(500).send('Server error');

    }
});


//Downvoting a post -: 

router.put('/posts/:postId/downvote', async (req, res) => {
    try {

      const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $inc: { downvotes: 1 } },
            { new: true }
         );
      res.json(post);

    } catch (err) {

        console.error(err);
        res.status(500).send('Server error');

    }
});


// upvote

router.put('/posts/:postId/comments/:commentId/upvote', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const comment = post.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).send('Comment not found');
      }
  
      comment.upvotes += 1;
      await post.save();
  
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  


// downvote

router.put('/posts/:postId/comments/:commentId/downvote', async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }
  
      const comment = post.comments.id(req.params.commentId);
      if (!comment) {
        return res.status(404).send('Comment not found');
      }
  
      comment.downvotes += 1;
      await post.save();
  
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;