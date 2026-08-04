import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '@clerk/clerk-react'
import './MyMovies.css'

import {
  getAllMovies,
  addMovie,
  deleteMovie,
} from '../../repositories/movieRepository'

type PersonalMovie = {
  id: number
  title: string
  genre: string
  status: string
}

function MyMovies() {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')
  const [movies, setMovies] = useState<PersonalMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      if (!isLoaded) {
        return
      }

      if (!isSignedIn) {
        setMovies([])
        setError(null)
        return
      }

      try {
        setIsLoading(true)

        const token = await getToken({
          skipCache: true,
        })

        if (!token) {
          setError('Unable to get your login session.')
          return
        }

        const data = await getAllMovies(token)

        setMovies(
          Array.isArray(data)
            ? (data as PersonalMovie[])
            : []
        )

        setError(null)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load movies.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadMovies()
  }, [getToken, isLoaded, isSignedIn])

  async function handleAddMovie(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const title = movieTitle.trim()
    const genre = movieGenre.trim()

    if (!title || !genre) {
      setError('Please enter both movie title and genre.')
      return
    }

    try {
      setIsLoading(true)

      const token = await getToken({
        skipCache: true,
      })

      if (!token) {
        setError('Unable to get your login session.')
        return
      }

      const newMovie = await addMovie(
        title,
        genre,
        token
      )

      setMovies((currentMovies) => [
        ...currentMovies,
        newMovie as PersonalMovie,
      ])

      setMovieTitle('')
      setMovieGenre('')
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to add movie.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemoveMovie(id: number) {
    try {
      setIsLoading(true)

      const token = await getToken({
        skipCache: true,
      })

      if (!token) {
        setError('Unable to get your login session.')
        return
      }

      await deleteMovie(id, token)

      setMovies((currentMovies) =>
        currentMovies.filter(
          (movie) => movie.id !== id
        )
      )

      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to remove movie.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <section className="my-movies">
        <h2>My Movies</h2>
        <p>Loading...</p>
      </section>
    )
  }

  if (!isSignedIn) {
    return (
      <section className="my-movies">
        <h2>My Movies</h2>
        <p>
          Please log in to view your personal movie
          collection.
        </p>
      </section>
    )
  }

  return (
    <section
      className="my-movies"
      aria-labelledby="my-movies-heading"
    >
      <h2 id="my-movies-heading">My Movies</h2>

      <p>
        These are movies saved in your personal movie
        collection.
      </p>

      {error && (
        <p className="my-movies__error">
          Error: {error}
        </p>
      )}

      <form
        className="movie-form"
        onSubmit={handleAddMovie}
      >
        <label htmlFor="movie-title">
          Movie Title
        </label>

        <input
          id="movie-title"
          type="text"
          value={movieTitle}
          onChange={(event) =>
            setMovieTitle(event.target.value)
          }
          placeholder="Enter movie title"
          disabled={isLoading}
        />

        <label htmlFor="movie-genre">
          Genre
        </label>

        <input
          id="movie-genre"
          type="text"
          value={movieGenre}
          onChange={(event) =>
            setMovieGenre(event.target.value)
          }
          placeholder="Enter movie genre"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Please wait...' : 'Add Movie'}
        </button>
      </form>

      <div className="movie-card-list">
        {movies.map((movie) => (
          <article
            key={movie.id}
            className="movie-card"
          >
            <div className="movie-info">
              <h3>{movie.title}</h3>

              <p>Genre: {movie.genre}</p>

              <p>Status: {movie.status}</p>

              <button
                type="button"
                className="remove-button"
                disabled={isLoading}
                onClick={() =>
                  void handleRemoveMovie(movie.id)
                }
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyMovies