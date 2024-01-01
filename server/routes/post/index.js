const express = require("express");

const router = express.Router();
const Post = require("../../models/post");
const User = require("../../models/user");

router.post("/new-post", async (req, res) => {
  const token = await req.cookies.token;
  const { description, image } = req.body;
  const post = await Post.create({ description, image });
  const user = await User.findOne({ username: token }).populate("friends");
  user.posts.push(post);
  user.friends.forEach((friend) => {
    friend.postsFeed.push(post);
    friend.save();
  });
  user.save();
  res.status(200).json({ post });
});

module.exports = router;
