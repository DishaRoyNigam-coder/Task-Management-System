// backend/api/index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const { notFound, errorHandler } = require('../middleware/errorMiddleware');

// Connect to DB (Vercel caches the connection across invocations)
connectDB();

const app = express();

// ============================================================
// ✅ CORS CONFIGURATION (FIXED)
// ============================================================
const allowedOrigins = [
  'https://task-management-system-st2m.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

// If you set CLIENT_URL in Vercel env vars, it gets added automatically
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      console.error(`❌ Blocked by CORS: ${origin}`);
      return callback(
        new Error(
          `CORS policy does not allow access from origin: ${origin}`
        ),
        false
      );
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS to ALL routes (this automatically handles OPTIONS preflight)
app.use(cors(corsOptions));

// ⚠️ Do NOT add app.options('*', cors()) — Express 5 throws "Missing parameter name"
// The cors() middleware above ALREADY handles preflight OPTIONS requests.

// ============================================================
// Body Parsers
// ============================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// Health check (useful to test backend is live)
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================
// Routes
// ============================================================
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/tasks', require('../routes/taskRoutes'));

// ============================================================
// Error Handling (must be LAST)
// ============================================================
app.use(notFound);
app.use(errorHandler);

// ❌ DO NOT use app.listen() — Vercel manages the server
module.exports = app;