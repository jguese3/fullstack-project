// reviewRepo — sole manager of Review data.
//
// What it does:
//   Holds the in-memory reviews store.
//   Provides CRUD methods: getAll, getByMovieId, create, delete.
//
// What it does NOT do:
//   Does not validate review content or movie existence — that belongs to reviewService.
//   Does not manage state or rendering concerns.
//
// Used by: reviewService

import { Review } from '../types';

let store: Review[] = [];

const reviewRepo = {
  /** Returns a copy of all reviews */
  getAll(): Review[] {
    return store.map((r) => ({ ...r }));
  },

  /** Returns all reviews for a specific movie */
  getByMovieId(movieId: number): Review[] {
    return store.filter((r) => r.movieId === movieId).map((r) => ({ ...r }));
  },

  /** Creates and stores a new review; returns the created review */
  create(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const newReview: Review = {
      ...review,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
    store = [newReview, ...store];
    return { ...newReview };
  },

  /** Deletes a review by id; returns true if deleted */
  delete(id: number): boolean {
    const exists = store.some((r) => r.id === id);
    if (!exists) return false;
    store = store.filter((r) => r.id !== id);
    return true;
  },
};

export default reviewRepo;
