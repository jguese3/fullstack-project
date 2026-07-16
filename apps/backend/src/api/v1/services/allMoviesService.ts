import { Movie } from "generated/prisma/client";
import prisma from "../../../../prisma/client";

export const getAllMovies = async (): Promise<any[]> => {
    try {
        const movies = await prisma.movie.findMany();
        return structuredClone(movies);
    } catch (error) {
        throw new Error("Error fetching movies: " + error);
    }
};

export const updateMovie = async (
    id: number,
    movieData: { watchlist?: boolean }
): Promise<Movie> => {
    try {
        return await prisma.movie.update({
            where: { id },
            data: movieData,
        });
    } catch (error) {
        throw new Error("Error updating movie: " + error);
    }
}