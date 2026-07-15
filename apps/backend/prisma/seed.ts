import "dotenv/config";
import process from "process";
import { PrismaClient } from "../generated/prisma/client";
import { movieSeedData } from "./seedData";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
    // clear table
    await prisma.movie.deleteMany();

    // insert movies to db
    const createManyMovies = await prisma.movie.createManyAndReturn(
        {
            data: movieSeedData,
            skipDuplicates: true
        }
    );

    console.log(`CREATED MOVIES: ${createManyMovies}`);
};

main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}); 