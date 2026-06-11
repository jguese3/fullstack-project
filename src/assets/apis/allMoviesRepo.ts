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