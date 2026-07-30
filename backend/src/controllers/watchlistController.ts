// watchlistController — Sprint 5: uses req.dbUserId (set by requireAuth).

import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/requireAuth';
import watchlistService from '../services/watchlistService';

const watchlistController = {
  async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.dbUserId!;
    const entries = await watchlistService.getAllForUser(userId);
    res.status(200).json(entries);
  },

  async toggle(req: AuthenticatedRequest, res: Response): Promise<void> {
    const movieId = Number(req.params.movieId);
    const userId = req.dbUserId!;
    const result = await watchlistService.toggle(movieId, userId);

    if (!result.success) {
      res.status(400).json({ errors: { movieId: result.error } });
      return;
    }
    res.status(200).json(result.entries);
  },

  async toggleWatched(req: AuthenticatedRequest, res: Response): Promise<void> {
    const movieId = Number(req.params.movieId);
    const userId = req.dbUserId!;
    const result = await watchlistService.toggleWatched(movieId, userId);

    if (!result.success) {
      res.status(400).json({ errors: { movieId: result.error } });
      return;
    }
    res.status(200).json(result.entries);
  },
};

export default watchlistController;
