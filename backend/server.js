const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// --- 1. ROUTE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// Config
dotenv.config();
const app = express();

// 👇 --- CORS FIX (Yahan Sudhar Kiya Hai) --- 👇
// origin: true ka matlab hai Vercel aur Mobile App dono allow ho jayenge
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) return console.log('⚠️ No Mongo URI found');

    // Quotes hatane ki koshish (Auto-fix for typo in env)
    const cleanURI = process.env.MONGO_URI.replace(/"/g, '').trim();

    await mongoose.connect(cleanURI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.log('❌ DB Connection Failed:', err.message);
  }
};
connectDB();

// --- 2. ROUTES MOUNT KARNA ---
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/school-data', schoolRoutes);
app.use('/api/attendance', attendanceRoutes);

// Root Route (Testing ke liye)
app.get('/', (req, res) => {
  res.send('SchoolOS API is Running Successfully... 🚀');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});