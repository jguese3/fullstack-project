// reviewRepo — Sprint 5: all requests include Clerk token (per-user data).

import { Review } from '../types';
import { API_BASE } from '../apiBase';

const reviewRepo = {
  async getAll(token: string): Promise<Review[]> {
    const res = await fetch(`${API_BASE}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch reviews.');
    return res.json();
  },

  async create(movieId: number, text: string, rating: number, token: string): Promise<Review[] | { error: string }> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ movieId, text, rating }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = body?.errors?.general || body?.errors?.text || 'Failed to create review.';
      return { error: msg };
    }
    return res.json();
  },

  async delete(id: number, token: string): Promise<Review[] | null> {
    const res = await fetch(`${API_BASE}/reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  },
};

export default reviewRepo;
