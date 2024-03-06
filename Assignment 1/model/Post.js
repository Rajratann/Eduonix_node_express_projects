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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    date : {
        type : Date,
        default : Date.now
    }
})

const Post = mongoose.model('posts', postSchema);

module.exports = Post;