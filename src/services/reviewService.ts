// reviewService — business logic for Review operations.
//
// What it does:
//   Validates review content (min length) and that the reviewed movie exists.
//   Delegates all data reads/writes to reviewRepo.
//
// What it does NOT do:
//   Does not hold or mutate data directly — that belongs to reviewRepo.
//   Does not manage React state — that belongs to useReviews hook.
//
// Used by: useReviews (invoked in ReviewsPage)

import { Review } from '../types';
import reviewRepo from '../repositories/reviewRepo';
import movieService from './movieService';

export interface ReviewResult {
  success: boolean;
  reviews: Review[];
  error?: string;
}

const MIN_REVIEW_LENGTH = 10;
const MAX_REVIEW_LENGTH = 300;

const reviewService = {
  /** Returns all reviews */
  getAll(): Review[] {
    return reviewRepo.getAll();
  },

  /**
   * Validates and creates a new review.
   * Rules: movie must exist, text must be 10–300 characters, rating 1–10.
   */
  create(movieId: number, text: string, rating: number): ReviewResult {
    // Validate movie exists
    if (!movieService.exists(movieId)) {
      return {
        success: false,
        reviews: reviewRepo.getAll(),
        error: 'Please select a valid movie.',
      };
    }

    // Validate review text length
    if (text.trim().length < MIN_REVIEW_LENGTH) {
      return {
        success: false,
        reviews: reviewRepo.getAll(),
        error: `Review must be at least ${MIN_REVIEW_LENGTH} characters.`,
      };
    }

    if (text.trim().length > MAX_REVIEW_LENGTH) {
      return {
        success: false,
        reviews: reviewRepo.getAll(),
        error: `Review must be at most ${MAX_REVIEW_LENGTH} characters.`,
      };
    }

    // Validate rating range
    if (rating < 1 || rating > 10) {
      return {
        success: false,
        reviews: reviewRepo.getAll(),
        error: 'Rating must be between 1 and 10.',
      };
    }

    reviewRepo.create({ movieId, text: text.trim(), rating });
    return { success: true, reviews: reviewRepo.getAll() };
  },

  /** Deletes a review by id */
  delete(id: number): ReviewResult {
    reviewRepo.delete(id);
    return { success: true, reviews: reviewRepo.getAll() };
  },
};

export default reviewService;
