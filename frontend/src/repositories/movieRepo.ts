// movieRepo — public, no auth needed (movies are shared for all users)
import { Movie } from '../types';
import { API_BASE } from '../apiBase';

const movieRepo = {
  async getAll(): Promise<Movie[]> {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies.');
    return res.json();
  },
};

export default movieRepo;
