import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getMoviesByUser(userId: string) {
  return prisma.movie.findMany({
    where: {
      userId,
    },
  })
}

export async function createMovieForUser(
  title: string,
  genre: string,
  status: string,
  userId: string
) {
  return prisma.movie.create({
    data: {
      title,
      genre,
      status,
      userId,
    },
  })
}

export async function deleteMovieForUser(
  id: number,
  userId: string
) {
  const movie = await prisma.movie.findFirst({
    where: {
      id,
      userId,
    },
  })

  if (!movie) {
    return null
  }

  return prisma.movie.delete({
    where: {
      id,
    },
  })
}