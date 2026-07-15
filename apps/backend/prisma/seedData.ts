import type { Movie } from "../generated/prisma/client";

export const movieSeedData: Omit<Movie, 'id'>[] = [
  {
    id: 1,
    title: "Inception",
    description:
      "A skilled thief enters dreams to steal secrets but is given a chance at redemption through one final mission.",
    releaseDate: "2010-07-16",
    rating: 8.8,
    watchlist: true,
    isWatched: true,
  },
  {
    id: 2,
    title: "Interstellar",
    description:
      "A group of astronauts travels through a wormhole in search of a new home for humanity.",
    releaseDate: "2014-11-07",
    rating: 8.7,
    watchlist: false,
    isWatched: true,
  },
  {
    id: 3,
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind determined to plunge Gotham into chaos.",
    releaseDate: "2008-07-18",
    rating: 9.0,
    watchlist: false,
    isWatched: true,
  },
  {
    id: 4,
    title: "Dune",
    description:
      "A young nobleman must protect the most valuable resource in the galaxy on a dangerous desert planet.",
    releaseDate: "2021-10-22",
    rating: 8.1,
    watchlist: true,
    isWatched: false,
  },
  {
    id: 5,
    title: "Everything Everywhere All at Once",
    description:
      "A laundromat owner discovers she must connect with alternate universe versions of herself to save reality.",
    releaseDate: "2022-03-25",
    rating: 8.0,
    watchlist: true,
    isWatched: false,
  },
  {
    id: 6,
    title: "Parasite",
    description:
      "A poor family schemes to infiltrate a wealthy household, leading to unexpected consequences.",
    releaseDate: "2019-05-30",
    rating: 8.5,
    watchlist: false,
    isWatched: true,
  },
  {
    id: 7,
    title: "Spider-Man: Into the Spider-Verse",
    description:
      "Teenager Miles Morales becomes Spider-Man and joins forces with heroes from other dimensions.",
    releaseDate: "2018-12-14",
    rating: 8.4,
    watchlist: true,
    isWatched: true,
  },
  {
    id: 8,
    title: "Top Gun: Maverick",
    description:
      "Pete Maverick Mitchell returns to train a new generation of fighter pilots for a dangerous mission.",
    releaseDate: "2022-05-27",
    rating: 8.3,
    watchlist: false,
    isWatched: false,
  },
];