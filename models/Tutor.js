const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  subject: { type: String, required: true },
  availableDays: { type: String },
  availableTime: { type: String },
  hourlyFee: { type: Number, required: true },
  totalSlot: { type: Number, default: 0 },
  sessionStartDate: { type: Date },
  institution: { type: String },
  experience: { type: String },
  location: { type: String },
  teachingMode: {
    type: String,
    enum: ['Online', 'Offline', 'Both'],
    default: 'Online'
  },
  userEmail: { type: String, required: true },
  userName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);