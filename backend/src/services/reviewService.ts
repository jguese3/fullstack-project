// reviewService — Sprint 5: review creation scoped to a specific userId.

import reviewRepo from '../repositories/reviewRepo';
import movieService from './movieService';
import { Review } from '@prisma/client';

export interface ReviewResult {
  success: boolean;
  reviews?: Review[];
  error?: string;
}

const reviewService = {
  async getAllForUser(userId: number): Promise<Review[]> {
    return reviewRepo.getAllForUser(userId);
  },

  async create(movieId: number, userId: number, text: string, rating: number): Promise<ReviewResult> {
    const movieExists = await movieService.exists(movieId);
    if (!movieExists) {
      return { success: false, error: 'Please select a valid movie.' };
    }

    if (rating < 1 || rating > 10) {
      return { success: false, error: 'Rating must be between 1 and 10.' };
    }

    await reviewRepo.create(movieId, userId, text, rating);
    return { success: true, reviews: await reviewRepo.getAllForUser(userId) };
  },

  async delete(id: number, userId: number): Promise<ReviewResult> {
    const existing = await reviewRepo.findById(id);
    if (!existing) {
      return { success: false, error: 'Review not found.' };
    }
    // Only the review owner can delete
    if (existing.userId !== userId) {
      return { success: false, error: 'Unauthorized: cannot delete another user\'s review.' };
    }

    await reviewRepo.delete(id);
    return { success: true, reviews: await reviewRepo.getAllForUser(userId) };
  },
};

export default reviewService;
