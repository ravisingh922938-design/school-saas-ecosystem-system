const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const testRoutes = require('./routes/testRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const financeRoutes = require('./routes/financeRoutes');
const { errorHandler } = require('./middleware/errorMiddleware'); // Assuming you'd want a generic error handler

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(express.json());
// Enable CORS for all routes
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/finance', financeRoutes);

// Test Route
// Root route
app.get('/', (req, res) => {
  res.send('API is Running Successfully');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🎉`);
});

