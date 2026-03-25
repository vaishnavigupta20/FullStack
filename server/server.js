// 1. IMPORT CORE MODULES FIRST
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

// 2. LOAD ENV VARS IMMEDIATELY
// This must happen before you require any file that uses process.env (like connectDB)
dotenv.config();

// 3. IMPORT CUSTOM MODULES AFTER ENV IS LOADED
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// 4. CONNECT TO DATABASE
connectDB();

const app = express();

// --- Security & Utility Middleware ---
app.use(helmet()); 
app.use(cors());   
app.use(express.json()); 

// Dev logging - Fallback to 'development' if NODE_ENV isn't set
const mode = process.env.NODE_ENV || 'development';
if (mode === 'development') {
  app.use(morgan('dev'));
}

// --- Routes ---
// Added a basic health check route (Good for Production)
app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// --- Error Handler (Must be last) ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${mode} mode on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g. DB connection issues)
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});