interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
}

export function AllMovies() {
  const movies: Movie[] = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, genre: "Drama" },
    { id: 2, title: "The Godfather", year: 1972, genre: "Crime" },
    { id: 3, title: "The Dark Knight", year: 2008, genre: "Action" },
    { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime" },
    { id: 5, title: "Forrest Gump", year: 1994, genre: "Drama" },
  ];

  return (
    <section className="all-movies">
      <h1>All Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}