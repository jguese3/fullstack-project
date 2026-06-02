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
