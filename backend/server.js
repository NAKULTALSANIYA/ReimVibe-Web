

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from 'fs';
import connectDB from './config/database.js';
import serviceRoutes from './routes/serviceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// API Routes - These must come before static file serving
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// SPA fallback - Handle all non-API routes by serving index.html
app.get('*', (req, res, next) => {
  // Skip API routes and static files
  if (req.url.startsWith('/api/') || 
      req.url.includes('.') || 
      req.url.includes('.js') || 
      req.url.includes('.css') || 
      req.url.includes('.png') || 
      req.url.includes('.jpg') || 
      req.url.includes('.jpeg') || 
      req.url.includes('.svg') || 
      req.url.includes('.ico') ||
      req.method !== 'GET') {
    return next();
  }

  try {
    const indexPath = path.join(__dirname, "../frontend/dist/index.html");
    const indexFile = readFileSync(indexPath, 'utf8');
    res.send(indexFile);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(404).send(`
      <html>
        <body>
          <h1>Application Not Ready</h1>
          <p>The React application has not been built yet.</p>
          <p>Please run the following commands:</p>
          <pre>cd frontend && npm install && npm run build</pre>
          <p>Then restart the server.</p>
        </body>
      </html>
    `);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend will be served from: http://localhost:${PORT}`);
});
