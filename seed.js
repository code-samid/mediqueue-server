require('dotenv').config();
const mongoose = require('mongoose');
const Tutor = require('./models/Tutor');

const tutors = [
  {
    name: 'Sarah Johnson',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    subject: 'Mathematics',
    availableDays: 'Mon–Fri',
    availableTime: '4:00 PM – 8:00 PM',
    hourlyFee: 28,
    totalSlot: 12,
    sessionStartDate: new Date('2025-06-01'),
    institution: 'University of Helsinki',
    experience: '7 years',
    location: 'Helsinki, Finland',
    teachingMode: 'Online',
    userEmail: 'sarah@mediqueue.com',
    userName: 'Sarah Johnson',
  },
  {
    name: 'Michael Chen',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    subject: 'Physics',
    availableDays: 'Mon, Wed, Fri',
    availableTime: '5:00 PM – 9:00 PM',
    hourlyFee: 32,
    totalSlot: 8,
    sessionStartDate: new Date('2025-06-05'),
    institution: 'Aalto University',
    experience: '5 years',
    location: 'Espoo, Finland',
    teachingMode: 'Both',
    userEmail: 'michael@mediqueue.com',
    userName: 'Michael Chen',
  },
  {
    name: 'Lisa Patel',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    subject: 'English',
    availableDays: 'Tue, Thu, Sat',
    availableTime: '10:00 AM – 2:00 PM',
    hourlyFee: 20,
    totalSlot: 15,
    sessionStartDate: new Date('2025-06-03'),
    institution: 'Tampere University',
    experience: '3 years',
    location: 'Tampere, Finland',
    teachingMode: 'Online',
    userEmail: 'lisa@mediqueue.com',
    userName: 'Lisa Patel',
  },
  {
    name: 'Ahmed Hassan',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    subject: 'Chemistry',
    availableDays: 'Mon–Thu',
    availableTime: '3:00 PM – 7:00 PM',
    hourlyFee: 25,
    totalSlot: 10,
    sessionStartDate: new Date('2025-06-02'),
    institution: 'University of Turku',
    experience: '6 years',
    location: 'Turku, Finland',
    teachingMode: 'Offline',
    userEmail: 'ahmed@mediqueue.com',
    userName: 'Ahmed Hassan',
  },
  {
    name: 'Emma Virtanen',
    photo: 'https://randomuser.me/api/portraits/women/26.jpg',
    subject: 'Biology',
    availableDays: 'Wed, Fri, Sat',
    availableTime: '9:00 AM – 1:00 PM',
    hourlyFee: 22,
    totalSlot: 14,
    sessionStartDate: new Date('2025-06-04'),
    institution: 'University of Oulu',
    experience: '4 years',
    location: 'Oulu, Finland',
    teachingMode: 'Both',
    userEmail: 'emma@mediqueue.com',
    userName: 'Emma Virtanen',
  },
  {
    name: 'James Okafor',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    subject: 'ICT',
    availableDays: 'Mon, Tue, Thu',
    availableTime: '6:00 PM – 10:00 PM',
    hourlyFee: 35,
    totalSlot: 6,
    sessionStartDate: new Date('2025-06-06'),
    institution: 'Haaga-Helia University',
    experience: '8 years',
    location: 'Helsinki, Finland',
    teachingMode: 'Online',
    userEmail: 'james@mediqueue.com',
    userName: 'James Okafor',
  },
  {
    name: 'Sofia Mäkinen',
    photo: 'https://randomuser.me/api/portraits/women/57.jpg',
    subject: 'Mathematics',
    availableDays: 'Sat, Sun',
    availableTime: '11:00 AM – 4:00 PM',
    hourlyFee: 18,
    totalSlot: 20,
    sessionStartDate: new Date('2025-06-07'),
    institution: 'Jyväskylä University',
    experience: '2 years',
    location: 'Jyväskylä, Finland',
    teachingMode: 'Online',
    userEmail: 'sofia@mediqueue.com',
    userName: 'Sofia Mäkinen',
  },
  {
    name: 'David Kim',
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
    subject: 'Physics',
    availableDays: 'Mon–Fri',
    availableTime: '7:00 PM – 10:00 PM',
    hourlyFee: 30,
    totalSlot: 9,
    sessionStartDate: new Date('2025-06-02'),
    institution: 'Aalto University',
    experience: '5 years',
    location: 'Espoo, Finland',
    teachingMode: 'Both',
    userEmail: 'david@mediqueue.com',
    userName: 'David Kim',
  },
  {
    name: 'Aisha Noor',
    photo: 'https://randomuser.me/api/portraits/women/90.jpg',
    subject: 'English',
    availableDays: 'Mon, Wed, Fri',
    availableTime: '2:00 PM – 6:00 PM',
    hourlyFee: 24,
    totalSlot: 11,
    sessionStartDate: new Date('2025-06-03'),
    institution: 'University of Eastern Finland',
    experience: '4 years',
    location: 'Joensuu, Finland',
    teachingMode: 'Online',
    userEmail: 'aisha@mediqueue.com',
    userName: 'Aisha Noor',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing tutors
    await Tutor.deleteMany({});
    console.log('🗑️  Cleared existing tutors');

    // Insert new tutors
    const inserted = await Tutor.insertMany(tutors);
    console.log(`🌱 Seeded ${inserted.length} tutors successfully`);

    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();