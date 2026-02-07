const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const Project = require('../models/Project'); // To verify project membership

// 1. Create a Ticket
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, projectId, priority, status } = req.body;

    // Create the new ticket
    const newTicket = new Ticket({
      title,
      description,
      project: projectId,
      priority,
      status,
      submitter: req.user.id
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. Get All Tickets for a Project (With Filters)
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { priority, search } = req.query;
    
    // Build the query object
    let query = { project: req.params.projectId };

    // Filter by Priority
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Search by Title (Case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const tickets = await Ticket.find(query)
      .populate('assignee', 'name email')
      .populate('submitter', 'name')
      .sort({ createdAt: -1 }); // Newest first
      
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 3. Update Ticket (Status, Priority, etc.)
router.put('/:id', auth, async (req, res) => {
  try {
    // Find ticket first
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    // Update fields
    const { title, description, priority, status, assignee } = req.body;
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (status) ticket.status = status;
    if (assignee) ticket.assignee = assignee;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 4. Delete Ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    await ticket.deleteOne();
    res.json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;