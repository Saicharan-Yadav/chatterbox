const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    username: String,
    dp: String,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;