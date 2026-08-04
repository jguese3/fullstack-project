import type { Movies } from "@prisma/client";
import prisma from "../../../../prisma/client";

export const getAllMovies = async (userId?: string): Promise<any[]> => {
    try {
        const movies = await prisma.movies.findMany();
        const personalMovies = userId
            ? await prisma.movie.findMany({
                where: { userId },
                select: { title: true, status: true },
            })
            : [];

        const personalMovieTitles = new Set(personalMovies.map((movie) => movie.title));

        return structuredClone(
            movies.map((movie) => ({
                ...movie,
                viewerUserId: userId ?? null,
                isInPersonalCollection: personalMovieTitles.has(movie.title),
                userScopedStatus: userId
                    ? personalMovies.find((entry) => entry.title === movie.title)?.status ?? null
                    : null,
            }))
        );
    } catch (error) {
        throw new Error("Error fetching movies: " + error);
    }
};

export const updateMovie = async (
    id: number,
    movieData: { watchlist?: boolean },
    userId?: string
): Promise<Movies> => {
    try {
        if (!userId) {
            throw new Error("Authentication required to update movie state");
        }

        return await prisma.movies.update({
            where: { id },
            data: movieData,
        });
    } catch (error) {
        throw new Error("Error updating movie: " + error);
    }
}