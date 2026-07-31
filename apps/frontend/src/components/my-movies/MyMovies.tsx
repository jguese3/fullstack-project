import { useState, useEffect } from 'react'
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
  const { getToken, isSignedIn } = useAuth()

  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')
  const [movies, setMovies] = useState<PersonalMovie[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      if (!isSignedIn) {
        setMovies([])
        return
      }

      try {
        const token = await getToken()

        if (!token) return

        const data = await getAllMovies(token)
        setMovies(data)
        setError(null)
      } catch (err) {
        setError(`${err}`)
      }
    }

    loadMovies()
  }, [getToken, isSignedIn])

  async function handleAddMovie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!movieTitle || !movieGenre) return

    try {
      const token = await getToken()

      if (!token) return

      const newMovie = await addMovie(
        movieTitle,
        movieGenre,
        token
      )

      setMovies([...movies, newMovie])
      setMovieTitle('')
      setMovieGenre('')
      setError(null)
    } catch (err) {
      setError(`${err}`)
    }
  }

  async function handleRemoveMovie(id: number) {
    try {
      const token = await getToken()

      if (!token) return

      await deleteMovie(id, token)

      setMovies(
        movies.filter((movie) => movie.id !== id)
      )

      setError(null)
    } catch (err) {
      setError(`${err}`)
    }
  }

  if (!isSignedIn) {
    return (
      <section className="my-movies">
        <h2>My Movies</h2>
        <p>Please log in to view your personal movie collection.</p>
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
        These are movies saved in your personal movie collection.
      </p>

      {error && <p className="my-movies__error">{error}</p>}

      <form
        className="movie-form"
        onSubmit={handleAddMovie}
      >
        <label htmlFor="movie-title">Movie Title</label>

        <input
          id="movie-title"
          type="text"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Enter movie title"
        />

        <label htmlFor="movie-genre">Genre</label>

        <input
          id="movie-genre"
          type="text"
          value={movieGenre}
          onChange={(e) => setMovieGenre(e.target.value)}
          placeholder="Enter movie genre"
        />

        <button type="submit">
          Add Movie
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
                onClick={() => handleRemoveMovie(movie.id)}
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