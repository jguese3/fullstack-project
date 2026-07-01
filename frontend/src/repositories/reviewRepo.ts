// reviewRepo — sole manager of Review data on the front-end.
// Sprint 4 refactor: now fetches from the real back-end instead of
// holding an in-memory array.

import { Review } from '../types';
import { API_BASE } from '../apiBase';

const reviewRepo = {
  async getAll(): Promise<Review[]> {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews.');
    return res.json();
  },

  async create(movieId: number, text: string, rating: number): Promise<Review[] | { error: string }> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, text, rating }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body?.errors?.general || body?.errors?.text || body?.errors?.movieId || body?.errors?.rating || 'Failed to create review.';
      return { error: message };
    }

    return res.json();
  },

  async delete(id: number): Promise<Review[] | null> {
    const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
    if (!res.ok) return null;
    return res.json();
  },
};

export default reviewRepo;
