router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;

    const newPost = new Post({
      userId,
      content,
      createdAt: new Date()
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });

  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// @route   GET /api/posts
// @desc    Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// @route   GET /api/posts/user/:userId
// @desc    Get posts for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
});

export default router;


