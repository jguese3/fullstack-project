import type { Movie } from "../../types/movies";

type MoviesResponseJSON = { message: string; data: Movie[] };
type MovieResponseJSON = { message: string; data: Movie };

const BASE_URL = (import.meta as any).env.VITE_API_URL ?? "http://localhost:3000";
const MOVIES_ENDPOINT = "/all-movies";

export async function fetchMovies(): Promise<Movie[]> {
    const movieResponse: Response = await fetch(
        `${BASE_URL}/api/v1${MOVIES_ENDPOINT}`
    );

    if (!movieResponse.ok) {
        throw new Error("Failed to fetch movies");
    }

    const json: MoviesResponseJSON = await movieResponse.json();
    return json.data;
}

export async function updateMovie(movieId: number, data: { watchlist?: boolean }): Promise<Movie> {
    const movieResponse: Response = await fetch(
        `${BASE_URL}/api/v1${MOVIES_ENDPOINT}/${movieId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );

    if (!movieResponse.ok) {
        throw new Error("Failed to update movie");
    }

    const json: MovieResponseJSON = await movieResponse.json();
    return json.data;
}
