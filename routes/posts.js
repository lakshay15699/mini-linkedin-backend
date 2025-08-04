// routes/postRoutes.js
const express = require("express");
const router = express.Router();

// Dummy posts array for now
const posts = [
  {
    id: 1,
    username: "john_doe",
    content: "This is my first post!",
  },
  {
    id: 2,
    username: "jane_smith",
    content: "Hello LinkedIn-like platform!",
  },
];

// GET /api/posts - get all posts
router.get("/", (req, res) => {
  res.json(posts);
});

module.exports = router;
