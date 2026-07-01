// watchlistController — translates HTTP requests into watchlistService calls.

import { Request, Response } from 'express';
import watchlistService from '../services/watchlistService';

const watchlistController = {
  // GET /api/watchlist
  async getAll(_req: Request, res: Response): Promise<void> {
    const entries = await watchlistService.getAll();
    res.status(200).json(entries);
  },

  // POST /api/watchlist/:movieId/toggle
  async toggle(req: Request, res: Response): Promise<void> {
    const movieId = Number(req.params.movieId);
    const result = await watchlistService.toggle(movieId);

    if (!result.success) {
      res.status(400).json({ errors: { movieId: result.error } });
      return;
    }

    res.status(200).json(result.entries);
  },

  // POST /api/watchlist/:movieId/toggle-watched
  async toggleWatched(req: Request, res: Response): Promise<void> {
    const movieId = Number(req.params.movieId);
    const result = await watchlistService.toggleWatched(movieId);

    if (!result.success) {
      res.status(400).json({ errors: { movieId: result.error } });
      return;
    }

    res.status(200).json(result.entries);
  },
};

export default watchlistController;
