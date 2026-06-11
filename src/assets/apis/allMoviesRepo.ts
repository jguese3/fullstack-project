import type { Movie } from '../../types/movies';
import { sampleMovies } from './mockMovieData';

// Get all movies
export function fetchMovies(): Movie[] {
    return sampleMovies;
}


