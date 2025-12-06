import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_secret';

app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'j31_healthcare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth route: hardcoded credentials per spec
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'Jeevith' && password === 'Jeevith') {
    const token = jwt.sign({ sub: 'Jeevith', role: 'student' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// JWT middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Chart endpoints (protected). Data is realistic placeholder; will align to selected article.
app.get('/api/chart1', authenticate, async (req, res) => {
  // Monthly adoption of AI-assisted diagnostics (Radiology) over last 6 months
  const data = {
    title: 'Monthly Adoption Rate of AI-assisted Diagnostics in Radiology',
    unit: 'percent',
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [12, 18, 26, 34, 43, 52],
    source: 'https://www.fda.gov/news-events' // FDA/JAMA 2025 article reference placeholder
  };
  res.json(data);
});

app.get('/api/chart2', authenticate, async (req, res) => {
  // Time-to-report reduction (minutes) by department after AI-assisted diagnostics rollout
  const data = {
    title: 'Average Time-to-Report Reduction by Department',
    unit: 'minutes',
    labels: ['Radiology', 'Cardiology', 'Oncology', 'Primary Care', 'ER'],
    values: [18, 12, 9, 7, 6],
    source: 'https://www.fda.gov/news-events' // FDA/JAMA 2025 article reference placeholder
  };
  res.json(data);
});

// Example DB check endpoint (optional)
app.get('/api/db-check', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ db: 'ok', result: rows[0] });
  } catch (e) {
    res.status(500).json({ db: 'error', message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
