const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tutorRoutes = require('./routes/tutors');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB error:', err));

// Routes
app.use('/tutors', tutorRoutes);
app.use('/bookings', bookingRoutes);
app.use('/jwt', authRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'TutorNova API is running 🚀' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});