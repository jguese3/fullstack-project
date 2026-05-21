import "./homepage.css";

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
}

const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
  },
  {
    id: 3,
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    rating: 8.5,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: 4,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and witches.",
  },
  {
    id: 5,
    title: "Dune",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    description:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset: a desert planet capable of producing a unique resource.",
  },
  {
    id: 6,
    title: "Everything Everywhere All at Once",
    genre: "Comedy",
    year: 2022,
    rating: 7.8,
    description:
      "An aging Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes.",
  },
];

const genres: string[] = [
  "All",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Comedy",
  "Drama",
];

export default function Homepage() {
  return (
    <section className="homepage">
      {/* Hero */}
      <div className="homepage__hero">
        <div className="homepage__hero-content">
          <p className="homepage__hero-eyebrow">Your personal movie catalogue</p>
          <h1 className="homepage__hero-title">
            Discover. Track. <span className="homepage__hero-accent">Review.</span>
          </h1>
          <p className="homepage__hero-subtitle">
            Browse thousands of films, build your watchlist, and share your
            reviews with the CineLog community.
          </p>
          <div className="homepage__hero-actions">
            <button className="homepage__btn homepage__btn--primary">
              Browse All Movies
            </button>
            <button className="homepage__btn homepage__btn--secondary">
              My Movies
            </button>
          </div>
        </div>
        <div className="homepage__hero-badge">
          <span className="homepage__hero-badge-number">10K+</span>
          <span className="homepage__hero-badge-label">Films catalogued</span>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="homepage__genre-section">
        <h2 className="homepage__section-title">Browse by Genre</h2>
        <ul className="homepage__genre-list">
          {genres.map((genre) => (
            <li key={genre} className="homepage__genre-item">
              <button className="homepage__genre-btn">{genre}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Movies */}
      <div className="homepage__featured">
        <h2 className="homepage__section-title">Featured Films</h2>
        <ul className="homepage__movies-grid">
          {featuredMovies.map((movie) => (
            <li key={movie.id} className="homepage__movie-card">
              <div className="homepage__movie-header">
                <span className="homepage__movie-genre">{movie.genre}</span>
                <span className="homepage__movie-rating">
                  ★ {movie.rating}
                </span>
              </div>
              <h3 className="homepage__movie-title">{movie.title}</h3>
              <p className="homepage__movie-year">{movie.year}</p>
              <p className="homepage__movie-description">{movie.description}</p>
              <button className="homepage__movie-btn">+ Add to My Movies</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
