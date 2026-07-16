/**
 * Jarones useMovies Hook
 */

import { useEffect, useState } from 'react';
import * as MoviesService from '../services/allMoviesService';
import type { Movies } from '../types/movies';

export function useMovies(
    dependencies: unknown[] = [],
    filterFn?: ((movie: Movies) => boolean) | null
) {
    const [movies, updateMovies] = useState<Movies[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadMovies = async () => {
            try {
                let result = await MoviesService.fetchMovies();
                if (filterFn) {
                    result = result.filter(filterFn);
                }
                if (!cancelled) {
                    updateMovies([...result]);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(`${err}`);
                }
            }
        };

        void loadMovies();

        return () => {
            cancelled = true;
        };
        // Intentionally keyed by caller-provided dependency list
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    const toggleWatchlist = async (movieId: number) => {
        try {
            const updatedMovies = await MoviesService.toggleWatchlist(
                movieId,
                movies
            );
            updateMovies([...updatedMovies]);
            setError(null);
        } catch (err) {
            setError(`${err}`);
        }
    };

    return { movies, toggleWatchlist, error };
}
