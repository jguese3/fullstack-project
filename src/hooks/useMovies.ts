/**
 * Jarones useMovies Hook
 * This custom React hook provides a convenient way for components to access movie data and manage the watchlist status of movies. It utilizes the All Movies Service to fetch movie data and toggle the watchlist status, allowing components to easily integrate movie-related functionality without needing to directly interact with the service layer.
 */

import {useEffect, useState} from 'react';
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
            setError(`${err}`)
        }
    };

    const toggleWatchlist = async (movieId: number) => {
        try {
            await MoviesService.toggleWatchlist(movieId);
            await fetchMovies();
        } catch (err) {
            setError(`${err}`)
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [...dependencies]);

    return { movies, toggleWatchlist, error };
}