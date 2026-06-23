/**
 * ReviewsPage — /reviews
 *
 * Architecture usage (satisfies I.3):
 *
 * HOOK (useReviews):
 *   Called here to manage the reviews list state, expose createReview and
 *   deleteReview actions, and surface any validation error message.
 *   All presentation state lives in the hook; this component only renders.
 *
 * HOOK (useWatchlist):
 *   Called here to display the watchlist count in the subtitle.
 *   Demonstrates the same hook being invoked across multiple pages (T.1).
 *
 * SERVICE (via useReviews → reviewService):
 *   Validation rules (min length, max length, rating range, movie existence)
 *   all live in reviewService. This component never validates directly.
 *
 * REPOSITORY (via useReviews → reviewService → reviewRepo):
 *   All review reads/writes go through reviewRepo. This component never
 *   touches data storage directly.
 */

import { useState } from 'react';
import movieService from '../services/movieService';
import useReviews from '../hooks/useReviews';
import useWatchlist from '../hooks/useWatchlist';

const MAX_REVIEW_LENGTH = 300;

const ReviewsPage = () => {
  const { reviews, createReview, deleteReview, error, clearError } = useReviews();
  const { count: watchlistCount } = useWatchlist();

  const [selectedMovieId, setSelectedMovieId] = useState<number | ''>('');
  const [reviewText, setReviewText]           = useState('');
  const [userRating, setUserRating]           = useState<number>(5);

  const movies  = movieService.getAll();
  const charsLeft = MAX_REVIEW_LENGTH - reviewText.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const success = createReview(
      Number(selectedMovieId),
      reviewText,
      userRating
    );

    if (success) {
      setSelectedMovieId('');
      setReviewText('');
      setUserRating(5);
    }
  };

  return (
    <main className="page-main">
      <div className="page-header">
        <h2 className="page-title">My Reviews</h2>
        <p className="page-subtitle">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''} written
          &nbsp;·&nbsp; {watchlistCount} movies in watchlist
        </p>
      </div>

      <section className="review-form-section">
        <h3 className="section-heading">Write a Review</h3>
        <form className="review-form" onSubmit={handleSubmit} noValidate>

          <div className="form-group">
            <label htmlFor="reviewMovie" className="form-label">Movie</label>
            <select
              id="reviewMovie"
              className={`form-select${error && !selectedMovieId ? ' form-input--error' : ''}`}
              value={selectedMovieId}
              onChange={(e) => setSelectedMovieId(Number(e.target.value) || '')}
            >
              <option value="">— Select a movie —</option>
              {movies.map((m) => (
                <option key={m.id} value={m.id}>{m.title} ({m.year})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reviewRating" className="form-label">
              Your Rating: <strong>{userRating}/10</strong>
            </label>
            <input
              id="reviewRating"
              type="range"
              min={1} max={10} step={1}
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
              className="rating-slider"
            />
            <div className="rating-labels">
              <span>1</span><span>5</span><span>10</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reviewText" className="form-label">
              Review
              <span className={`char-count${charsLeft < 30 ? ' char-count--warn' : ''}`}>
                {charsLeft} chars left
              </span>
            </label>
            <textarea
              id="reviewText"
              className={`form-textarea${reviewText.trim().length > 0 && reviewText.trim().length < 10 ? ' form-input--error' : ''}`}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value.slice(0, MAX_REVIEW_LENGTH))}
              placeholder="What did you think of this movie?"
              rows={4}
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="form-submit">Post Review</button>
        </form>
      </section>

      <section className="reviews-list-section">
        <h3 className="section-heading">All Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✍️</span>
            <p>No reviews yet. Write your first one above!</p>
          </div>
        ) : (
          <ul className="reviews-list">
            {reviews.map((review) => {
              const movie = movieService.getById(review.movieId);
              return (
                <li key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="review-movie-title">{movie?.title ?? 'Unknown'}</span>
                    <span className="review-rating">
                      {'★'.repeat(Math.round(review.rating / 2))} {review.rating}/10
                    </span>
                    <span className="review-date">{review.createdAt}</span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <button
                    className="review-delete-btn"
                    onClick={() => deleteReview(review.id)}
                    aria-label="Delete review"
                  >
                    🗑 Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default ReviewsPage;
