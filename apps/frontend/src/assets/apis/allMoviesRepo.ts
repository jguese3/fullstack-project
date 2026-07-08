/**
 * Jarones All Movies Repository
 * This module provides functions to interact with the movie data, including fetching all movies, getting a movie by ID, and managing the watchlist status of movies.
 * The data is currently mocked using a sample dataset, but these functions can be easily adapted to fetch data from an API or database in the future.
 */
import type { Movie } from '../../types/movies';
import { sampleMovies } from './mockMovieData';

// Get all movies
export function fetchMovies(): Movie[] {
    return sampleMovies;
}

// Get movie by id
export function getMovieById(id: number): Movie {
    const foundMovie = sampleMovies.find(movie => movie.id === id);
    if (!foundMovie) {
        throw new Error(`Movie with id ${id} not found`);
    }
    return foundMovie;
}

// Add movie to watchlist
export async function addToWatchlist(movieId: number) {
    const foundMovie = sampleMovies.find(movie => movie.id === movieId);
    if (!foundMovie) {
        throw new Error(`Movie with id ${movieId} not found`);
    } else {
        foundMovie.watchlist = true;
    }
    return foundMovie;
}

// Remove movie from watchlist
export async function removeFromWatchlist(movieId: number) {
    const foundMovie = sampleMovies.find(movie => movie.id === movieId);
    if (!foundMovie) {
        throw new Error(`Movie with id ${movieId} not found`);
    } else {
        foundMovie.watchlist = false;
    }
    return foundMovie;
}