import { useState } from 'react';
import type { JSX } from 'react';
import type { Movie } from '../../types/movies';
import { MovieCard } from '../movie-card/MovieCard';
import './MovieListDisplay.css';

export function MovieListDisplay({
    movies,
    updateMovies,
}: {
    movies: Movie[];
    updateMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}) {
    const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);

    const handleMovieFavoriteToggle = (movieClicked: Movie): void => {
        updateMovies(oldMovieState => {
            return oldMovieState.map(movie => {
                if (movie.id === movieClicked.id) {
                    return {
                        ...movie,
                        watchlist: !movie.watchlist,
                    }
                } else {
                    return movie;
                }
            });
        });
    };

    const movieListItems: JSX.Element[] = movies.map((movie) => {
        return (
            <MovieCard
                key={movie.id}
                movie={movie}
                isExpanded={movie.id === expandedMovieId}
                onTitleClick={() => {
                    setExpandedMovieId(movie.id === expandedMovieId ? null : movie.id);
                }}
                onWatchlistClick={() => handleMovieFavoriteToggle(movie)}
            />
        );
    });

    return <div className="movie-list-display">{movieListItems}</div>;
}