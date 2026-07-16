import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getMovies(
  _req: Request,
  res: Response
) {
  const movies = await prisma.movie.findMany()

  res.json(movies)
}

export async function createMovie(
  req: Request,
  res: Response
) {
  const { title, genre, status } = req.body

  const movie = await prisma.movie.create({
    data: {
      title,
      genre,
      status,
    },
  })

  res.status(201).json(movie)
}

export async function deleteMovie(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id)

  await prisma.movie.delete({
    where: {
      id,
    },
  })

  res.status(204).send()
}