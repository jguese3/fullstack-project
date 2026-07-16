import { Movies } from "generated/prisma/client";
import prisma from "../../../../prisma/client";

export const getAllMovies = async (): Promise<any[]> => {
    try {
        const movies = await prisma.movies.findMany();
        return structuredClone(movies);
    } catch (error) {
        throw new Error("Error fetching movies: " + error);
    }
};

export const updateMovie = async (
    id: number,
    movieData: { watchlist?: boolean }
): Promise<Movies> => {
    try {
        return await prisma.movies.update({
            where: { id },
            data: movieData,
        });
    } catch (error) {
        throw new Error("Error updating movie: " + error);
    }
}