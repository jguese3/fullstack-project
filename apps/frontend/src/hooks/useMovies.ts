/**
 * Jarones useMovies Hook
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import * as MoviesService from '../services/allMoviesService';
import type { Movies } from '../types/movies';

export function useMovies(
    dependencies: unknown[] = [],
    filterFn?: ((movie: Movies) => boolean) | null
) {
    const [movies, updateMovies] = useState<Movies[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        let cancelled = false;

        const loadMovies = async () => {
            try {
                const token = isSignedIn ? await getToken() : null;
                let result = await MoviesService.fetchMovies(token);
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
    }, [dependencies, getToken, isSignedIn]);

    const toggleWatchlist = async (movieId: number) => {
        try {
            if (!isSignedIn) {
                setError('Please sign in to manage your watchlist.');
                return;
            }

            const token = await getToken();
            const updatedMovies = await MoviesService.toggleWatchlist(
                movieId,
                movies,
                token
            );
            updateMovies([...updatedMovies]);
            setError(null);
        } catch (err) {
            setError(`${err}`);
        }
    };

    return { movies, toggleWatchlist, error, isSignedIn };
}
