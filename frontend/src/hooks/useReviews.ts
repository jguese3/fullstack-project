// useReviews — Sprint 5: all requests include the Clerk token.
// Reviews are per-user — each user sees only their own reviews.
// Invoked in: ReviewsPage

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
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
  const { getToken, isSignedIn } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSignedIn) {
      setReviews([]);
      setLoading(false);
      return;
    }

    getToken()
      .then((token) => reviewRepo.getAll(token ?? ''))
      .then(setReviews)
      .catch((err) => console.error('[useReviews]', err))
      .finally(() => setLoading(false));
  }, [isSignedIn, getToken]);

  const createReview = useCallback(
    async (movieId: number, text: string, rating: number): Promise<boolean> => {
      setError('');
      const token = await getToken();
      if (!token) { setError('You must be signed in to post a review.'); return false; }

      const result = await reviewRepo.create(movieId, text, rating, token);
      if ('error' in result) { setError(result.error); return false; }

      setReviews(result);
      return true;
    },
    [getToken]
  );

  const deleteReview = useCallback(async (id: number): Promise<void> => {
    const token = await getToken();
    if (!token) return;
    const updated = await reviewRepo.delete(id, token);
    if (updated) setReviews(updated);
  }, [getToken]);

  const clearError = useCallback(() => setError(''), []);

  return { reviews, loading, createReview, deleteReview, error, clearError };
};

export default useReviews;
