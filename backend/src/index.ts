// index.ts — MovieFlex Express backend entry point (Sprint 5)

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';
import watchlistRoutes from './routes/watchlistRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const ALLOWED_ORIGINS = process.env.FRONTEND_ORIGIN
  ? [process.env.FRONTEND_ORIGIN]
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
     'http://127.0.0.1:5173', 'http://127.0.0.1:5174'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    if (/^https:\/\/.*\.app\.github\.dev$/.test(origin)) return callback(null, true);
    console.warn(`[CORS] Blocked: ${origin}`);
    callback(new Error(`CORS blocked: ${origin}`));
  },
}));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'MovieFlex backend is running.' });
});

app.use('/api', movieRoutes);
app.use('/api', watchlistRoutes);
app.use('/api', reviewRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'MovieFlex API — Sprint 5',
    auth: 'Watchlist and Reviews require Bearer token (Clerk)',
    endpoints: [
      'GET    /api/health',
      'GET    /api/movies             (public)',
      'GET    /api/watchlist          (auth required)',
      'POST   /api/watchlist/:id/toggle (auth required)',
      'POST   /api/watchlist/:id/toggle-watched (auth required)',
      'GET    /api/reviews            (auth required)',
      'POST   /api/reviews            (auth required)',
      'DELETE /api/reviews/:id        (auth required)',
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
  console.log(`✅  MovieFlex backend running at http://localhost:${PORT}`);
  console.log(`    Movies (public):    http://localhost:${PORT}/api/movies`);
  console.log(`    Watchlist (auth):   http://localhost:${PORT}/api/watchlist`);
});
