const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Post = require("../../models/post");

router.get("/:id", async (req, res) => {
  const user = await User.findOne({ username: req.params.id });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({user});
});

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    likes: req.body.likes,
  });
  post.save().then((post) => {
    res.json(post);
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("comments")
    .then((post) => {
      res.json(post);
    });
});

// export
module.exports = router;
