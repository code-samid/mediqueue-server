const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const verifyToken = require('../middleware/verifyToken');

// GET all tutors — with search and date filter
router.get('/', async (req, res) => {
  try {
    const { search, startDate, endDate, limit } = req.query;
    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by session start date range
    if (startDate || endDate) {
      query.sessionStartDate = {};
      if (startDate) query.sessionStartDate.$gte = new Date(startDate);
      if (endDate) query.sessionStartDate.$lte = new Date(endDate);
    }

    let tutorsQuery = Tutor.find(query).sort({ createdAt: -1 });

    // Limit results if specified
    if (limit) tutorsQuery = tutorsQuery.limit(parseInt(limit));

    const tutors = await tutorsQuery;
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET my tutors by email — protected
router.get('/my-tutors', verifyToken, async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const tutors = await Tutor.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single tutor by ID
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new tutor — protected
router.post('/', verifyToken, async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    const saved = await tutor.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update tutor — protected
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Tutor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE tutor — protected
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Tutor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json({ message: 'Tutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;