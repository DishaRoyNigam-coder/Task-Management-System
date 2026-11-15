// backend/api/index.js
const express = require('express');
const connectDB = require('../config/db');
const { notFound, errorHandler } = require('../middleware/errorMiddleware');

connectDB();

const app = express();

// ⚠️ CORS is now handled by vercel.json, so we REMOVE app.use(cors(...)) here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/tasks', require('../routes/taskRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;