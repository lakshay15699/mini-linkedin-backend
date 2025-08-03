import express from "express";
const router = express.Router();

// Get a user's profile by ID
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.status(200).json({ message: `Profile for user ${userId}` });
});

export default router;
