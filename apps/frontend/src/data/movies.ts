import type { Movie } from "../types";

export const ALL_MOVIES: Movie[] = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: 8.7, description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "🚀" },
  { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, rating: 9.0, description: "When the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests.", poster: "🦇" },
  { id: 3, title: "Parasite", genre: "Thriller", year: 2019, rating: 8.5, description: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster: "🪲" },
  { id: 4, title: "Spirited Away", genre: "Animation", year: 2001, rating: 8.6, description: "During her family's move, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and witches.", poster: "🌊" },
  { id: 5, title: "Dune", genre: "Sci-Fi", year: 2021, rating: 8.0, description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.", poster: "🏜️" },
  { id: 6, title: "Everything Everywhere All at Once", genre: "Comedy", year: 2022, rating: 7.8, description: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save existence.", poster: "🥯" },
  { id: 7, title: "Oppenheimer", genre: "Drama", year: 2023, rating: 8.9, description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", poster: "⚛️" },
  { id: 8, title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, rating: 8.1, description: "A writer encounters the owner of an aging European hotel between the wars and hears of the adventures of its legendary concierge.", poster: "🏨" },
  { id: 9, title: "Whiplash", genre: "Drama", year: 2014, rating: 8.5, description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are challenged.", poster: "🥁" },
  { id: 10, title: "Arrival", genre: "Sci-Fi", year: 2016, rating: 7.9, description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.", poster: "🛸" },
  { id: 11, title: "The Lighthouse", genre: "Thriller", year: 2019, rating: 7.5, description: "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island.", poster: "🔦" },
  { id: 12, title: "Hereditary", genre: "Horror", year: 2018, rating: 7.3, description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.", poster: "👁️" },
];

export const GENRES = ["All", "Action", "Sci-Fi", "Thriller", "Animation", "Comedy", "Drama", "Horror"];
