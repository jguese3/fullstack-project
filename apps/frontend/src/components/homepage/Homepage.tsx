import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type {
  Dispatch,
  SetStateAction,
} from 'react'

import type { WatchlistMovie } from '../../types'
import {
  ALL_MOVIES,
  GENRES,
} from '../../data/movies'

import './homepage.css'

type HomepageMovie = {
  id: number
  title: string
  genre: string
  rating: number
  year: number
  description: string
}

interface HomepageProps {
  watchlist: WatchlistMovie[]

  setWatchlist: Dispatch<
    SetStateAction<WatchlistMovie[]>
  >

  addToMyMovies: (
    movie: HomepageMovie
  ) => Promise<void>
}

export default function Homepage({
  watchlist,
  setWatchlist,
  addToMyMovies,
}: HomepageProps) {
  const [searchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] =
    useState('All')

  const [addingMovieId, setAddingMovieId] =
    useState<number | null>(null)

  const [error, setError] =
    useState<string | null>(null)

  const navigate = useNavigate()

  const filtered = ALL_MOVIES.filter(
    (movie) => {
      const matchesSearch =
        movie.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        movie.genre
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )

      const matchesGenre =
        selectedGenre === 'All' ||
        movie.genre === selectedGenre

      return matchesSearch && matchesGenre
    }
  )

  function isInWatchlist(id: number) {
    return watchlist.some(
      (movie) => movie.id === id
    )
  }

  async function handleAddToWatchlist(
    movie: HomepageMovie
  ) {
    if (isInWatchlist(movie.id)) {
      navigate('/my-movies')
      return
    }

    try {
      setAddingMovieId(movie.id)
      setError(null)

      await addToMyMovies(movie)

      const entry: WatchlistMovie = {
        ...movie,
        status: 'plan-to-watch',
        addedAt: new Date().toISOString(),
      }

      setWatchlist(
        (currentWatchlist) => [
          ...currentWatchlist,
          entry,
        ]
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to add movie.'
      )
    } finally {
      setAddingMovieId(null)
    }
  }

  return (
    <section className="homepage">
      <div className="homepage__hero">
        <div className="homepage__hero-content">
          <p className="homepage__hero-eyebrow">
            Your personal movie catalogue
          </p>

          <h1 className="homepage__hero-title">
            Discover. Track.
            <span className="homepage__hero-accent">
              {' '}
              Review.
            </span>
          </h1>

          <p className="homepage__hero-subtitle">
            Browse movies, build your
            watchlist, and track what you want
            to watch next.
          </p>

          <div className="homepage__hero-actions">
            <button
              type="button"
              className="homepage__btn homepage__btn--primary"
              onClick={() =>
                navigate('/all-movies')
              }
            >
              Browse All Movies
            </button>

            <button
              type="button"
              className="homepage__btn homepage__btn--secondary"
              onClick={() =>
                navigate('/my-movies')
              }
            >
              My Movies
            </button>
          </div>
        </div>

        <div className="homepage__hero-badge">
          <span className="homepage__hero-badge-number">
            {ALL_MOVIES.length}
          </span>

          <span className="homepage__hero-badge-label">
            Movies Available
          </span>
        </div>
      </div>

      <div className="homepage__genre-section">
        <h2 className="homepage__section-title">
          Browse by Genre
        </h2>

        <ul className="homepage__genre-list">
          {GENRES.map((genre) => (
            <li
              key={genre}
              className="homepage__genre-item"
            >
              <button
                type="button"
                className="homepage__genre-btn"
                onClick={() =>
                  setSelectedGenre(genre)
                }
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="homepage__featured">
        <h2 className="homepage__section-title">
          Featured Films
        </h2>

        {error && (
          <p className="homepage__error">
            {error}
          </p>
        )}

        <ul className="homepage__movies-grid">
          {filtered.map((movie) => {
            const added = isInWatchlist(
              movie.id
            )

            const isAdding =
              addingMovieId === movie.id

            return (
              <li
                key={movie.id}
                className="homepage__movie-card"
              >
                <div className="homepage__movie-header">
                  <span className="homepage__movie-genre">
                    {movie.genre}
                  </span>

                  <span className="homepage__movie-rating">
                    ★ {movie.rating}
                  </span>
                </div>

                <h3 className="homepage__movie-title">
                  {movie.title}
                </h3>

                <p className="homepage__movie-year">
                  {movie.year}
                </p>

                <p className="homepage__movie-description">
                  {movie.description}
                </p>

                <button
                  type="button"
                  className="homepage__movie-btn"
                  disabled={isAdding}
                  onClick={() =>
                    void handleAddToWatchlist(
                      movie
                    )
                  }
                >
                  {isAdding
                    ? 'Adding...'
                    : added
                      ? '✓ View in My Movies'
                      : '+ Add to My Movies'}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}