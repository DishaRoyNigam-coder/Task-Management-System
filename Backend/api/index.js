// backend/api/index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db'); // Adjust path
const { notFound, errorHandler } = require('../middleware/errorMiddleware');

// Connect to DB (Vercel will cache the connection across invocations)
connectDB();

const app = express();

// CORS Configuration - Use the deployed frontend URL later
app.use(cors({
  origin: process.env.CLIENT_URL, // We will set this in Vercel
  credentials: true,
}));
app.use(express.json());

// Your Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/tasks', require('../routes/taskRoutes'));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// ❌ DO NOT USE app.listen()
// ✅ Export the app
module.exports = app;