// useReviews — presentation hook for review state management.
// Sprint 4 refactor: seeds state asynchronously from the back-end via
// reviewRepo. createReview now returns a Promise<boolean> since it
// involves a network round trip and server-side validation.
//
// Invoked in: ReviewsPage

import { useState, useEffect, useCallback } from 'react';
import { Review } from '../types';
import reviewRepo from '../repositories/reviewRepo';

interface UseReviewsResult {
  reviews: Review[];
  loading: boolean;
  createReview: (movieId: number, text: string, rating: number) => Promise<boolean>;
  deleteReview: (id: number) => Promise<void>;
  error: string;
  clearError: () => void;
}

const useReviews = (): UseReviewsResult => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reviewRepo
      .getAll()
      .then(setReviews)
      .catch((err) => console.error('[useReviews] Failed to load:', err))
      .finally(() => setLoading(false));
  }, []);

  const createReview = useCallback(
    async (movieId: number, text: string, rating: number): Promise<boolean> => {
      setError('');
      const result = await reviewRepo.create(movieId, text, rating);

      if ('error' in result) {
        setError(result.error);
        return false;
      }

      setReviews(result);
      return true;
    },
    []
  );

  const deleteReview = useCallback(async (id: number): Promise<void> => {
    const updated = await reviewRepo.delete(id);
    if (updated) setReviews(updated);
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { reviews, loading, createReview, deleteReview, error, clearError };
};

export default useReviews;
