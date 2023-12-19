const express = require("express");

const router = express.Router();
const Post = require("../../models/post");

router.get("/", (req, res) => {
  Post.find()
    .populate("comments")
    .then((posts) => {
      res.json(posts);
    });
});

module.exports = router;
