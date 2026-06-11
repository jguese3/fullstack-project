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

