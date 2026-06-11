// movieService — business logic for Movie operations.
//
// What it does:
//   Applies filtering/search rules to movies fetched from movieRepo.
//   Validates movie existence before other services use a movieId.
//
// What it does NOT do:
//   Does not hold or mutate any data — that belongs to movieRepo.
//   Does not manage state or UI — that belongs to hooks/components.
//
// Used by: watchlistService, reviewService, useSearch (indirectly via movieRepo)

import { Movie, Genre } from '../types';
import movieRepo from '../repositories/movieRepo';

export interface MovieFilter {
  query?: string;
  genre?: Genre | '';
}

const movieService = {
  /** Returns all movies from the repository */
  getAll(): Movie[] {
    return movieRepo.getAll();
  },

  /** Returns a single movie by id, or undefined */
  getById(id: number): Movie | undefined {
    return movieRepo.getById(id);
  },

  /**
   * Filters movies by an optional search query (title/director)
   * and an optional genre. Pure business logic — no state involved.
   */
  filter(movies: Movie[], { query = '', genre = '' }: MovieFilter): Movie[] {
    const q = query.toLowerCase().trim();
    return movies.filter((movie) => {
      const matchesQuery =
        !q ||
        movie.title.toLowerCase().includes(q) ||
        movie.director.toLowerCase().includes(q);
      const matchesGenre = !genre || movie.genre === genre;
      return matchesQuery && matchesGenre;
    });
  },

  /** Returns true if a movie with the given id exists in the repository */
  exists(id: number): boolean {
    return movieRepo.getById(id) !== undefined;
  },
};

export default movieService;
