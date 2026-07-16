import type { Movie } from '../../types/movies';
import "./movie-card.css"

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
    const releaseDate = new Date(movie.releaseDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="movie-card" onClick={onTitleClick}>
            <div className="movie-card-top">
                <div>
                    <h3>{movie.title}</h3>
                    <span className={`movie-card-status ${movie.isWatched ? 'movie-card-status--watched' : 'movie-card-status--unwatched'}`}>
                        {movie.isWatched ? 'Watched' : 'Not watched'}
                    </span>
                </div>
            </div>
            {isExpanded ? (
                <div className="movie-card-expanded">
                    <p className="movie-card-description">{movie.description}</p>
                    <ul className="movie-card-details">
                        <li><strong>Release Date:</strong> {releaseDate}</li>
                        <li><strong>Rating:</strong> {movie.rating.toFixed(1)}</li>
                    </ul>
                </div>
            ) : null}
            <button
                className="movie-card-button"
                onClick={(event) => {
                    event.stopPropagation();
                    onWatchlistClick();
                }}
            >
                {movie.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
        </div>
    );
}