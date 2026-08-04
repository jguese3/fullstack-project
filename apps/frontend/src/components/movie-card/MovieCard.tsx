import { useState } from 'react';
import type { Movies } from '../../types/movies';
import "./movie-card.css"

export function MovieCard(
    {
        movie,
        isExpanded,
        isSignedIn,
        onTitleClick,
        onWatchlistClick,
    }:
    {
        movie: Movies,
        isExpanded: boolean,
        isSignedIn: boolean,
        onTitleClick: () => void,
        onWatchlistClick: () => void,
    }
) {
    const [clickCount, setClickCount] = useState(0);
    const [watchedByClicks, setWatchedByClicks] = useState(false);
    const releaseDate = new Date(movie.releaseDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const isWatched = watchedByClicks || movie.isWatched;

    const handleCardClick = () => {
        if (isSignedIn) {
            return;
        }

        const nextCount = clickCount + 1;
        setClickCount(nextCount);
        if (nextCount >= 4) {
            setWatchedByClicks(true);
        }
        onTitleClick();
    };

    return (
        <div className="movie-card" onClick={handleCardClick}>
            <div className="movie-card-top">
                <div>
                    <h3>{movie.title}</h3>
                    {isSignedIn ? (
                        <span className={`movie-card-status ${isWatched ? 'movie-card-status--watched' : 'movie-card-status--unwatched'}`}>
                            {isWatched ? 'Watched' : 'Not watched'}
                        </span>
                    ) : null}
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
            {isSignedIn ? (
                <button
                    className="movie-card-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onWatchlistClick();
                    }}
                >
                    {movie.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
            ) : null}
        </div>
    );
}