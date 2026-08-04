import type { MouseEvent } from 'react'
import type { Movies } from '../../types/movies'

import './movie-card.css'

type MovieCardProps = {
  movie: Movies
  isExpanded: boolean
  onTitleClick: () => void
  onAddToMyMovies: () => Promise<void>
}

export function MovieCard({
  movie,
  isExpanded,
  onTitleClick,
  onAddToMyMovies,
}: MovieCardProps) {
  const releaseDate = new Date(
    movie.releaseDate
  ).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  async function handleAddClick(
    event: MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation()
    await onAddToMyMovies()
  }

  return (
    <article
      className="movie-card"
      onClick={onTitleClick}
    >
      <div className="movie-card-top">
        <div>
          <h3>{movie.title}</h3>

          <span
            className={
              movie.isWatched
                ? 'movie-card-status movie-card-status--watched'
                : 'movie-card-status movie-card-status--unwatched'
            }
          >
            {movie.isWatched
              ? 'Watched'
              : 'Not watched'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="movie-card-expanded">
          <p className="movie-card-description">
            {movie.description}
          </p>

          <ul className="movie-card-details">
            <li>
              <strong>
                Release Date:
              </strong>{' '}
              {releaseDate}
            </li>

            <li>
              <strong>Rating:</strong>{' '}
              {movie.rating.toFixed(1)}
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        className="movie-card-button"
        onClick={(event) =>
          void handleAddClick(event)
        }
      >
        Add to My Movies
      </button>
    </article>
  )
}