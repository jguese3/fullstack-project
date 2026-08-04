import type { Movies } from "../../types/movies";

type MoviesResponseJSON = { message: string; data: Movies[] };
type MovieResponseJSON = { message: string; data: Movies };

const BASE_URL = (import.meta as any).env.VITE_API_URL ?? "http://localhost:3000";
const MOVIES_ENDPOINT = "/all-movies";

function buildHeaders(token?: string | null) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export async function fetchMovies(token?: string | null): Promise<Movies[]> {
    const movieResponse: Response = await fetch(
        `${BASE_URL}/api/v1${MOVIES_ENDPOINT}`,
        {
            headers: buildHeaders(token),
        }
    );

    if (!movieResponse.ok) {
        throw new Error("Failed to fetch movies");
    }

    const json: MoviesResponseJSON = await movieResponse.json();
    return json.data;
}

export async function updateMovie(
    movieId: number,
    data: { watchlist?: boolean },
    token?: string | null
): Promise<Movies> {
    const movieResponse: Response = await fetch(
        `${BASE_URL}/api/v1${MOVIES_ENDPOINT}/${movieId}`,
        {
            method: "PUT",
            headers: buildHeaders(token),
            body: JSON.stringify(data),
        }
    );

    if (!movieResponse.ok) {
        throw new Error("Failed to update movie");
    }

    const json: MovieResponseJSON = await movieResponse.json();
    return json.data;
}
