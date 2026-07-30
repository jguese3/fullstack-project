// reviewController — Sprint 5: uses req.dbUserId (set by requireAuth).

import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/requireAuth';
import reviewService from '../services/reviewService';

const reviewController = {
  async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    const userId = req.dbUserId!;
    const reviews = await reviewService.getAllForUser(userId);
    res.status(200).json(reviews);
  },

  async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { movieId, text, rating } = req.body;
    const userId = req.dbUserId!;

    const result = await reviewService.create(
      Number(movieId),
      userId,
      text,
      Number(rating)
    );

    if (!result.success) {
      res.status(400).json({ errors: { general: result.error } });
      return;
    }
    res.status(201).json(result.reviews);
  },

  async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const userId = req.dbUserId!;
    const result = await reviewService.delete(id, userId);

    if (!result.success) {
      res.status(404).json({ errors: { id: result.error } });
      return;
    }
    res.status(200).json(result.reviews);
  },
};

export default reviewController;
