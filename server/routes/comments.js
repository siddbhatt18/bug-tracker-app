const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

// Get comments for a ticket
router.get('/:ticketId', auth, async (req, res) => {
  try {
    const comments = await Comment.find({ ticket: req.params.ticketId })
      .populate('user', 'name') // Get user name
      .sort({ createdAt: -1 }); // Newest first
    res.json(comments);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a comment
router.post('/:ticketId', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = new Comment({
      content,
      ticket: req.params.ticketId,
      user: req.user.id
    });
    const comment = await newComment.save();
    
    // Return the comment with the user's name populated immediately
    await comment.populate('user', 'name');
    res.json(comment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;