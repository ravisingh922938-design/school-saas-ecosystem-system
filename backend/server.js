const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
// const superAdminRoutes = require('./routes/superAdminRoutes'); // (Agar bani ho to uncomment karein)
// const schoolRoutes = require('./routes/schoolRoutes');     // (Agar bani ho to uncomment karein)

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true })); // Allow all for now
app.use(express.json());

// Database Connection (Agar MONGO_URI set hai to connect karega, warna skip karega crash hone se bachane ke liye)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));
} else {
  console.log('⚠️ Warning: MONGO_URI not found in .env');
}

// Routes Mount Karna
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
// app.use('/api/super-admin', superAdminRoutes);
// app.use('/api/school', schoolRoutes);

// Root Route (Testing ke liye)
app.get('/', (req, res) => {
  res.send('API is Running Successfully...');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
// Force Update for Login Fix