import prisma from "../../../../prisma/client";

export const getAllMovies = async (): Promise<any[]> => {
    try {
        const movies = await prisma.movie.findMany();
        return structuredClone(movies);
    } catch (error) {
        throw new Error("Error fetching movies: " + error);
    }
};
