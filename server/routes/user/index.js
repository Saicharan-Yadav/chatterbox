const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Post = require("../../models/post");

router.get("/profile/:id", async (req, res) => {
  const token = await req.cookies.token;
  const you = await User.findOne({ username: token });
  const user = await User.findOne({ username: req.params.id })
    .populate("pending")
    .populate("requested")
    .populate("friends");

  user.friends.forEach((friend) => {
    if (friend.username === you.username) {
      user.isFriend = true;
    }
  });
  user.pending.forEach((pending) => {
    if (pending.username === you.username) {
      user.isPending = true;
    }
  });
  user.requested.forEach((requested) => {
    if (requested.username === you.username) {
      user.isRequested = true;
    }
  });
  const data = {
    username: user.username,
    dp: user.dp,
    posts: user.posts,
    friends: user.friends,
    owner: token === user.username,
    isFriend: user.isFriend,
    isRequested: user.isRequested,
    isPending: user.isPending,
  };
  res.status(200).json({ data });
});

router.get("/feed", async (req, res) => {
  const token = await req.cookies.token;
  const user = await User.findOne({ username: token }).populate("postsFeed");
  const data = [];
  user.postsFeed.forEach((post) => {
    data.push({
      description: post.description,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      id: post._id,
    });
  });
  res.status(200).json({ data });
});

// search user by username
router.get("/search/:username", (req, res) => {
  const regex = new RegExp(req.params.username, "i");
  User.find({ username: regex })
    .then((users) => {
      users.forEach((user) => {
        if (
          user.friends.includes(req.cookies.token) ||
          user.username === req.cookies.token
        ) {
          user.isFriend = true;
        } else {
          user.isFriend = false;
        }
      });
      res.status(200).json({ users });
    })
    .catch((err) => console.log(err));
});

// get requests
router.get("/requests/sent", async (req, res) => {
  const token = await req.cookies.token;
  try {
    const user = await User.findOne({ username: token }).populate("pending");
    const data = [];
    user.pending.forEach((user) => {
      data.push({ username: user.username, dp: user.dp });
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
});

// get pending requests
router.get("/requests/received", async (req, res) => {
  const token = await req.cookies.token;
  try {
    const user = await User.findOne({ username: token }).populate("requested");
    const data = [];
    user.requested.forEach((user) => {
      data.push({ username: user.username, dp: user.dp });
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// add friend
router.get("/add-friend/:username", async (req, res) => {
  const token = await req.cookies.token;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    await User.findOneAndUpdate(
      { username: token },
      { $push: { pending: user._id } }
    );
    const you = await User.findOne({ username: token });
    await User.findOneAndUpdate(
      { username },
      { $push: { requested: you._id } }
    );
    res.status(200).json({ msg: "Friend request sent" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// accept friend request
router.get("/accept-request/:username", async (req, res) => {
  const token = await req.cookies.token;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    await User.findOneAndUpdate(
      { username: token },
      { $pull: { requested: user._id } }
    );
    await User.findOneAndUpdate(
      { username: token },
      { $push: { friends: user._id } }
    );
    const you = await User.findOne({ username: token });
    await User.findOneAndUpdate({ username }, { $pull: { pending: you._id } });
    await User.findOneAndUpdate({ username }, { $push: { friends: you._id } });
    res.status(200).json({ msg: "Friend request accepted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// reject friend request
router.get("/reject-request/:username", async (req, res) => {
  const token = await req.cookies.token;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    await User.findOneAndUpdate(
      { username: token },
      { $pull: { requested: user._id } }
    );
    const you = await User.findOne({ username: token });
    await User.findOneAndUpdate({ username }, { $pull: { pending: you._id } });
    res.status(200).json({ msg: "Friend request rejected" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// remove friend
router.get("/remove-friend/:username", async (req, res) => {
  const token = await req.cookies.token;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    await User.findOneAndUpdate(
      { username: token },
      { $pull: { friends: user._id } }
    );
    const you = await User.findOne({ username: token });
    await User.findOneAndUpdate({ username }, { $pull: { friends: you._id } });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// cancel request
router.get("/cancel-request/:username", async (req, res) => {
  const token = await req.cookies.token;
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    await User.findOneAndUpdate(
      { username: token },
      { $pull: { pending: user._id } }
    );
    const you = await User.findOne({ username: token });
    await User.findOneAndUpdate(
      { username },
      { $pull: { requested: you._id } }
    );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
