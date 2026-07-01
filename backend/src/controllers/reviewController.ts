// reviewController — translates HTTP requests into reviewService calls.

import { Request, Response } from 'express';
import reviewService from '../services/reviewService';

const reviewController = {
  // GET /api/reviews
  async getAll(_req: Request, res: Response): Promise<void> {
    const reviews = await reviewService.getAll();
    res.status(200).json(reviews);
  },

  // POST /api/reviews
  async create(req: Request, res: Response): Promise<void> {
    const { movieId, text, rating } = req.body;

    const result = await reviewService.create({
      movieId: Number(movieId),
      text,
      rating: Number(rating),
    });

    if (!result.success) {
      res.status(400).json({ errors: { general: result.error } });
      return;
    }

    res.status(201).json(result.reviews);
  },

  // DELETE /api/reviews/:id
  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const result = await reviewService.delete(id);

    if (!result.success) {
      res.status(404).json({ errors: { id: result.error } });
      return;
    }

    res.status(200).json(result.reviews);
  },
};

export default reviewController;
