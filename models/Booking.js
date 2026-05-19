const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tutorId: { type: String, required: true },
  tutorName: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ['pending', 'cancelled'],
    default: 'pending'
  },
  bookedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);