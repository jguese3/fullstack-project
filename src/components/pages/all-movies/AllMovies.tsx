import type { Movie } from '../../../types/movies';
import { MovieListDisplay } from '../../movie-list-display/MovieListDisplay';
import './AllMovies.css';

export function AllMovies({
    movies,
    updateMovies,
}: {
    movies: Movie[];
    updateMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}) {
    return (
      <>
        <header>
            <h1>All Movies</h1>
        </header>
        <main>
            <MovieListDisplay movies={movies} updateMovies={updateMovies} />
        </main>
        </>
    )
} 