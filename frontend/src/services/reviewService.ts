// reviewService — Sprint 5: thin pass-through; token handled by useReviews hook.
import { Review } from '../types';
import reviewRepo from '../repositories/reviewRepo';

const reviewService = {
  async getAll(token: string): Promise<Review[]> {
    return reviewRepo.getAll(token);
  },
  async create(movieId: number, text: string, rating: number, token: string) {
    return reviewRepo.create(movieId, text, rating, token);
  },
  async delete(id: number, token: string): Promise<Review[] | null> {
    return reviewRepo.delete(id, token);
  },
};

export default reviewService;
