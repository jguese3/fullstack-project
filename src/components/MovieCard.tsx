// MovieCard — displays a single movie's details.
// Receives isInWatchlist and toggle handler as props so it can
// be reused in both the Catalogue and Watchlist pages.

import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onToggleWatchlist: (movieId: number) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = Math.round(rating / 2); // convert 0-10 to 0-5 stars
  return (
    <span className="star-rating" aria-label={`Rating: ${rating} out of 10`}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  );
};

const MovieCard = ({ movie, isInWatchlist, onToggleWatchlist }: MovieCardProps) => (
  <article className={`movie-card${isInWatchlist ? ' movie-card--watchlisted' : ''}`}>
    <div className="movie-poster">{movie.poster}</div>
    <div className="movie-info">
      <div className="movie-meta">
        <span className="movie-genre">{movie.genre}</span>
        <span className="movie-year">{movie.year}</span>
      </div>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-director">dir. {movie.director}</p>
      <StarRating rating={movie.rating} />
      <p className="movie-description">{movie.description}</p>
      <button
        className={`watchlist-btn${isInWatchlist ? ' watchlist-btn--remove' : ''}`}
        onClick={() => onToggleWatchlist(movie.id)}
        aria-label={isInWatchlist ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
      >
        {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
      </button>
    </div>
  </article>
);

export default MovieCard;
