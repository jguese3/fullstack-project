// Central type definitions for CineLog

export type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Horror'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Romance'
  | 'Animation'
  | 'Documentary'
  | 'Fantasy';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: Genre;
  director: string;
  rating: number;      // 0.0 – 10.0
  description: string;
  poster: string;      // emoji stand-in for poster art
}

export interface WatchlistEntry {
  movieId: number;
  addedAt: string;     // ISO date string
  watched: boolean;
}

/**
 * Represents a user-written review for a movie.
 * Managed exclusively by reviewRepo.
 */
export interface Review {
  id: number;
  movieId: number;
  text: string;
  rating: number;      // 1 – 10
  createdAt: string;   // locale date string
}
