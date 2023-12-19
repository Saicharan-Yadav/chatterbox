const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: String,
    image: String,
    likes: Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;