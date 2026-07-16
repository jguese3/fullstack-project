import type { Movie } from "../../types/movies";

type MoviesResponseJSON = {message: string, data: Movie[]};

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
