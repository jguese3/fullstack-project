import prisma from "../../../../prisma/client"

export const getAllMovies = async (): Promise<any[]> => {
    try {
        return await prisma.movie.findMany();
    } catch (error) {
        throw new Error("Error fetching movies: " + error);
    }
};
