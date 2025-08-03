const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Create a post (protected)
router.post("/", authMiddleware, async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const newPost = new Post({
      content,
      author: req.user.id
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all posts (public feed)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get posts by user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("author", "name email");

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
