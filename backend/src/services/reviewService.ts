// reviewService — business logic for Review operations.
//
// What it does:
//   Validates that the reviewed movie exists, and that the rating falls
//   within range, before delegating to reviewRepo. (Text length and basic
//   shape validation already happened in the validation middleware.)
//
// What it does NOT do:
//   Does not touch Prisma directly — that belongs to reviewRepo.
//   Does not handle HTTP — that belongs to the controller.

import reviewRepo from '../repositories/reviewRepo';
import movieService from './movieService';
import { Review } from '@prisma/client';
import { CreateReviewInput } from '../types';

export interface ReviewResult {
  success: boolean;
  review?: Review;
  reviews?: Review[];
  error?: string;
}

const reviewService = {
  async getAll(): Promise<Review[]> {
    return reviewRepo.getAll();
  },

  async create(input: CreateReviewInput): Promise<ReviewResult> {
    const movieExists = await movieService.exists(input.movieId);
    if (!movieExists) {
      return { success: false, error: 'Please select a valid movie.' };
    }

    if (input.rating < 1 || input.rating > 10) {
      return { success: false, error: 'Rating must be between 1 and 10.' };
    }

    const review = await reviewRepo.create(input);
    return { success: true, review, reviews: await reviewRepo.getAll() };
  },

  async delete(id: number): Promise<ReviewResult> {
    const existing = await reviewRepo.findById(id);
    if (!existing) {
      return { success: false, error: `Review with id ${id} does not exist.` };
    }

    await reviewRepo.delete(id);
    return { success: true, reviews: await reviewRepo.getAll() };
  },
};

export default reviewService;
