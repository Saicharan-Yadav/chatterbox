const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  postsFeed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  requested: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pending: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bio: String,
  isFriend: Boolean,
  isRequested: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
