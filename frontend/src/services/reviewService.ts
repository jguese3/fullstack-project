// reviewService — Sprint 4: thin pass-through to reviewRepo since all
// business validation runs on the back-end. Maintains the architecture layer.

import { Review } from '../types';
import reviewRepo from '../repositories/reviewRepo';

const reviewService = {
  async getAll(): Promise<Review[]> {
    return reviewRepo.getAll();
  },

  async create(movieId: number, text: string, rating: number): Promise<Review[] | { error: string }> {
    return reviewRepo.create(movieId, text, rating);
  },

  async delete(id: number): Promise<Review[] | null> {
    return reviewRepo.delete(id);
  },
};

export default reviewService;
