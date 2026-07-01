// index.ts — Express application entry point.

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const ALLOWED_ORIGINS = process.env.FRONTEND_ORIGIN
  ? [process.env.FRONTEND_ORIGIN]
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
    ];

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / curl
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      // GitHub Codespaces forwards each port to a unique *.app.github.dev URL
      if (/^https:\/\/.*\.app\.github\.dev$/.test(origin)) return callback(null, true);

      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      callback(new Error(`CORS blocked: ${origin}`));
    },
  })
);
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'CineLog backend is running.' });
});

app.use('/api', movieRoutes);
app.use('/api', watchlistRoutes);
app.use('/api', reviewRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'CineLog API',
    endpoints: [
      'GET    /api/health',
      'GET    /api/movies',
      'GET    /api/watchlist',
      'POST   /api/watchlist/:movieId/toggle',
      'POST   /api/watchlist/:movieId/toggle-watched',
      'GET    /api/reviews',
      'POST   /api/reviews',
      'DELETE /api/reviews/:id',
    ],
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`✅  CineLog backend running at http://localhost:${PORT}`);
  console.log(`    Try: http://localhost:${PORT}/api/health`);
  console.log(`    Try: http://localhost:${PORT}/api/movies`);
});
