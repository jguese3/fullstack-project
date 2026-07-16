/**
 * Jarones useMovies Hook
 */

import { useEffect, useState } from 'react';
import * as MoviesService from '../services/allMoviesService';
import type { Movie } from '../types/movies';

export function useMovies(dependencies: unknown[], filterFn?: ((movie: Movie) => boolean) | null) {
    const [movies, updateMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchMovies = async () => {
        try {
            let result = await MoviesService.fetchMovies();
            if (filterFn) {
                result = result.filter(filterFn);
            }
            updateMovies([...result]);
        } catch (err) {
            setError(`${err}`);
        }
    };

    const toggleWatchlist = async (movieId: number) => {
        try {
            const updatedMovies = await MoviesService.toggleWatchlist(
                movieId,
                movies
            );
            updateMovies([...updatedMovies]);
        } catch (err) {
            setError(`${err}`);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [...dependencies]);

    return { movies, toggleWatchlist, error };
}