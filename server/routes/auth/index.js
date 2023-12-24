const express = require("express");
const router = express();
const bcrypt = require("bcryptjs");

const User = require("../../models/user");

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ msg: "Please fill all fields" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ msg: "Username not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  res.status(201).json({ msg: "Login successful", token: user.username });
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(400).json({ msg: "Username already exists" });
    } else {
      return res.status(400).json({ msg: "Email address already registered" });
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Registration failed" });
  }
});

module.exports = router;
