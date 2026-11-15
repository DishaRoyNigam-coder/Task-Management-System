const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const { notFound, errorHandler } = require('../middleware/errorMiddleware');

const app = express();

// 1. CORS Configuration
const allowedOrigins = [
  'https://task-management-system-st2m.vercel.app',
  'http://localhost:5173'
];
if (process.env.CLIENT_URL) allowedOrigins.push(process.env.CLIENT_URL);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS blocked'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204 // Preflight ke liye 204 return karega
};

// CORS middleware sabse pehle lagayein
app.use(cors(corsOptions));

// 2. Express 5 compatible OPTIONS handler ( '*' ki jagah '/*splat' )
app.options('/*splat', cors(corsOptions));

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. DB Connection (OPTIONS request par DB connect mat karein)
app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') return next(); // Preflight ko DB se mat rokein

  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// 5. Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/tasks', require('../routes/taskRoutes'));

// 6. Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;