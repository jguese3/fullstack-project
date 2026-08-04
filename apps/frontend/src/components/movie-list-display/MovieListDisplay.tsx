import { useState } from 'react';
import type { JSX } from 'react';
import type { Movies } from '../../types/movies';
import { MovieCard } from '../movie-card/MovieCard';
import './MovieListDisplay.css';

export function MovieListDisplay({
    movies,
    onWatchlistClick,
    isSignedIn,
}: {
    movies: Movies[];
    onWatchlistClick: (movieId: number) => Promise<void> | void;
    isSignedIn: boolean;
}) {
    const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);

    const movieListItems: JSX.Element[] = movies.map((movie) => {
        return (
            <MovieCard
                key={movie.id}
                movie={movie}
                isExpanded={movie.id === expandedMovieId}
                isSignedIn={isSignedIn}
                onTitleClick={() => {
                    setExpandedMovieId(movie.id === expandedMovieId ? null : movie.id);
                }}
                onWatchlistClick={() => onWatchlistClick(movie.id)}
            />
        );
    });

    return <div className="movie-list-display">{movieListItems}</div>;
}