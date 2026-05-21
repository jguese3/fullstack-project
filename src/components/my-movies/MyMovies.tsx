import './MyMovies.css'

function MyMovies() {
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

  return (
    <section className="my-movies" aria-labelledby="my-movies-heading">
      <h2 id="my-movies-heading">My Movies</h2>

      <p>These are movies saved in the user's personal movie collection.</p>

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
