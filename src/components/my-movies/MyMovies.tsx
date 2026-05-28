import { useState } from 'react'
import './MyMovies.css'

function MyMovies() {
  const [movieTitle, setMovieTitle] = useState('')
  const [movieGenre, setMovieGenre] = useState('')

  const movies = [
    {
      id: 1,
      title: 'Game of Thrones',
      genre: 'Thriller',
      status: 'Watched',
    },
    {
      id: 2,
      title: 'Spider-Man: No Way Home',
      genre: 'Superhero',
      status: 'Watching',
    },
    {
      id: 3,
      title: 'Inside Out',
      genre: 'Animation',
      status: 'Saved',
    },
  ]

  function handleSubmit(event: any) {
    event.preventDefault()

    setMovieTitle('')
    setMovieGenre('')
  }

  return (
    <section className="my-movies" aria-labelledby="my-movies-heading">
      <h2 id="my-movies-heading">My Movies</h2>

      <p>These are movies saved in the user's personal movie collection.</p>

      <form className="movie-form" onSubmit={handleSubmit}>
        <label htmlFor="movie-title">Movie Title</label>

        <input
          id="movie-title"
          type="text"
          value={movieTitle}
          onChange={(event) => setMovieTitle(event.target.value)}
          placeholder="Enter movie title"
        />

        <label htmlFor="movie-genre">Genre</label>

        <input
          id="movie-genre"
          type="text"
          value={movieGenre}
          onChange={(event) => setMovieGenre(event.target.value)}
          placeholder="Enter movie genre"
        />

        <button type="submit">Add Movie</button>
      </form>

      <div className="movie-card-list">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Status: {movie.status}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyMovies