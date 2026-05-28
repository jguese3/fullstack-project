import type { Movie } from '../types/movies';

export function MovieCard(
    {
        movie,
        isExpanded,
        onTitleClick,
        onWatchlistClick,
    }:
    {
        movie: Movie,
        isExpanded: boolean,
        onTitleClick: () => void,
        onWatchlistClick: () => void,
    }
) {
    return (
        <div className="movie-card">
            <div className="movie-card-top">
                <h3 onClick={onTitleClick}>{movie.title}</h3>

                <button onClick={onWatchlistClick}>
                    {movie.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>

            </div>
            {isExpanded ? <p>{movie.description}</p> : null}
        </div>
    );
}