/**
 * Jarones All Movies Service
 * This module provides a service layer that interacts with the All Movies Repository to fetch movie data and manage the watchlist status of movies. It serves as an intermediary between the repository and the components that consume the movie data, allowing for separation of concerns and easier maintenance.
 */
import * as MoviesRepo from '../assets/apis/allMoviesRepo';
import type { Movie } from '../types/movies';

/**
 * Requests all movies from the repository and returns them. This function can be used by components to get the list of movies to display.
 * @returns A promise resolving to the list of all movies.
 */
export async function fetchMovies() {
    const movies = await MoviesRepo.fetchMovies();
    return movies;
}

/**
 * Function to toggle the watchlist status of a movie. If the movie is currently in the watchlist, it will be removed; if it is not in the watchlist, it will be added. This function can be used by components to allow users to manage their watchlist.
 * @param movieId : the ID of the movie to toggle the watchlist status for.
 */
export function toggleWatchlist(movieId: number, movies: Movie[]): Movie[] {
    return movies.map((movie) =>
        movie.id === movieId
            ? { ...movie, watchlist: !movie.watchlist }
            : movie
    );
}