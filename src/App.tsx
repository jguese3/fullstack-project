<<<<<<< HEAD
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistMovie } from "./types";
import Layout from "./components/layout/Layout";
import Homepage from "./components/homepage/Homepage";
import AllMovies from "./components/all-movies/AllMovies";
import MyMovies from "./components/my-movies/MyMovies";

export default function App() {
  // T.3: Shared state initialized at top-level, passed to all pages
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);

  return (
    <BrowserRouter>
      <Layout watchlistCount={watchlist.length}>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage watchlist={watchlist} setWatchlist={setWatchlist} />
            }
          />
          <Route
            path="/all-movies"
            element={
              <AllMovies watchlist={watchlist} setWatchlist={setWatchlist} />
            }
          />
          <Route
            path="/my-movies"
            element={
              <MyMovies watchlist={watchlist} setWatchlist={setWatchlist} />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
=======
import './App.css'
// import Homepage from "./components/homepage/Homepage";

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">MovieFlix</h1>

        <nav>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/">All Movies</a>
            </li>

            <li>
              <a href="/">My Movies</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h2>Welcome to MovieFlix</h2>

        <p>
          Discover and manage your favorite movies in one place.
        </p>
      </main>

      <footer className="footer">
        <p>
          Group Members: Navpreet Singh, Rajandeep Kaur, Jarone Guese
        </p>
      </footer>
    </div>
  )
}

export default App
>>>>>>> 269522736b9278c528c710d6b88bcff704bbda16
