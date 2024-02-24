const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String, 
        require : true
    },
    content : {
        type : String,
        require : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    upvotes: { 
            type: Number, 
            default: 0 
         },
    downvotes: { 
            type: Number, 
            default: 0 
        },
    comments: [
            {
                text: { 
                    type: String,
                    require : true
                },
                author: { 
                    type : mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required : true
                },
                upvotes: { 
                    type: Number, 
                    default: 0 
                },
                downvotes: { 
                    type: Number, 
                    default: 0 
                }
            }
      ]
})


const Post = mongoose.model('posts',postSchema);

module.exports = Post;