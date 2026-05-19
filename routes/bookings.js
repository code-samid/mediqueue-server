const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Tutor = require('../models/Tutor');
const verifyToken = require('../middleware/verifyToken');

// POST create new booking
router.post('/', async (req, res) => {
  try {
    const { tutorId } = req.body;

    // Check tutor exists and has available slots
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    if (tutor.totalSlot <= 0) {
      return res.status(400).json({ message: 'No available slots left' });
    }

    // Create booking
    const booking = new Booking(req.body);
    const saved = await booking.save();

    // Decrease tutor slot by 1
    await Tutor.findByIdAndUpdate(tutorId, {
      $inc: { totalSlot: -1 }
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET bookings by student email — protected
router.get('/', verifyToken, async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const bookings = await Booking.find({ studentEmail: email })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH cancel booking
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;