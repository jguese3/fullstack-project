// useReviews — presentation hook for review state management.
//
// What it does:
//   Seeds reviews state from reviewRepo via reviewService on mount.
//   Exposes create and delete actions, syncing state after each operation.
//   Returns the current error message if a service operation fails.
//
// What it does NOT do:
//   Does not validate review content — that is reviewService's concern.
//   Does not read or write data directly — that belongs to reviewRepo.
//
// Invoked in: ReviewsPage
// Also satisfies T.1 (custom hook used alongside useWatchlist).

import { useState, useCallback } from 'react';
import { Review } from '../types';
import reviewService from '../services/reviewService';

interface UseReviewsResult {
  /** Current list of all reviews */
  reviews: Review[];
  /** Creates a new review; sets error if validation fails */
  createReview: (movieId: number, text: string, rating: number) => boolean;
  /** Deletes a review by id */
  deleteReview: (id: number) => void;
  /** Current error message, or empty string if none */
  error: string;
  /** Clears the current error message */
  clearError: () => void;
}

const useReviews = (): UseReviewsResult => {
  const [reviews, setReviews] = useState<Review[]>(
    () => reviewService.getAll()
  );
  const [error, setError] = useState('');

  const createReview = useCallback(
    (movieId: number, text: string, rating: number): boolean => {
      setError('');
      const result = reviewService.create(movieId, text, rating);
      if (!result.success) {
        setError(result.error ?? 'Failed to create review.');
        return false;
      }
      setReviews(result.reviews);
      return true;
    },
    []
  );

  const deleteReview = useCallback((id: number): void => {
    const result = reviewService.delete(id);
    if (result.success) setReviews(result.reviews);
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { reviews, createReview, deleteReview, error, clearError };
};

export default useReviews;
