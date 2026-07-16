import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
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
  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')
  const [movies, setMovies] = useState<PersonalMovie[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await getAllMovies()
        setMovies(data)
        setError(null)
      } catch (err) {
        setError(`${err}`)
      }
    }

    loadMovies()
  }, [])

  async function handleAddMovie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!movieTitle || !movieGenre) {
      return
    }

    try {
      const newMovie = await addMovie(movieTitle, movieGenre)
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
      await deleteMovie(id)
      setMovies(movies.filter((movie) => movie.id !== id))
      setError(null)
    } catch (err) {
      setError(`${err}`)
    }
  }

  return (
    <section
      className="my-movies"
      aria-labelledby="my-movies-heading"
    >
      <h2 id="my-movies-heading">My Movies</h2>

      <p>
        These are movies saved in the user's personal movie
        collection.
      </p>

      {error ? <p className="my-movies__error">{error}</p> : null}

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
        />

        <button type="submit">
          Add Movie
        </button>
      </form>

      <div className="movie-card-list">
        {movies.map((movie) => (
          <article
            className="movie-card"
            key={movie.id}
          >
            <div className="movie-info">
              <h3>{movie.title}</h3>

              <p>Genre: {movie.genre}</p>

              <p>Status: {movie.status}</p>

              <button
                type="button"
                className="remove-button"
                onClick={() =>
                  handleRemoveMovie(movie.id)
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
