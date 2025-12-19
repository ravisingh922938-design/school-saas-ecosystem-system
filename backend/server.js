const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // ✅ Ye line missing thi, isliye error aaya

// --- ROUTE IMPORTS ---
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const orderRoutes = require('./routes/orderRoutes');
const examRoutes = require('./routes/examRoutes');

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// --- DATABASE CONNECTION (Clean Version) ---
const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      console.log('⚠️ No Mongo URI found in .env');
      return;
    }

    // Connect using Mongoose
    await mongoose.connect(dbUrl);
    console.log('✅ MongoDB Connected Successfully');

  } catch (err) {
    console.log('❌ DB Connection Failed:', err.message);
  }
};

// Connect to DB
connectDB();

// --- ROUTES MOUNT ---
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/school-data', schoolRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/exams', examRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('SchoolOS API is Live! 🚀');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});