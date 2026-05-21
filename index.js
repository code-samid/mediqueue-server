const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tutorRoutes = require('./routes/tutors');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS — must be before everything else
const allowedOrigins = [
  'http://localhost:3000',
  'https://mediqueue-client-omega.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

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
  res.json({ message: 'MediQueue API is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`🚀 MediQueue Server running on port ${PORT}`);
});