import express from 'express';
import User from '../models/User.js';
import Post from '../models/Post.js';

const router = express.Router();

// @route   GET /api/users/:userId
// @desc    Get user profile by ID (including their posts)
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.status(200).json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

export default router;
