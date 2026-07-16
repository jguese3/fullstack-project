import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()

export async function getMovies() {
  return prisma.movie.findMany()
}

export async function createMovie(
  title: string,
  genre: string,
  status: string
) {
  return prisma.movie.create({
    data: {
      title,
      genre,
      status,
    },
  })
}