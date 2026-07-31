import type { Request, Response } from 'express'
import { getAuth } from '@clerk/express'

import {
  getMoviesByUser,
  createMovieForUser,
  deleteMovieForUser,
} from '../services/movieService'

export async function getMovies(
  req: Request,
  res: Response
) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      res.status(401).json({
        message: 'You must be logged in.',
      })
      return
    }

    const movies = await getMoviesByUser(userId)

    res.status(200).json(movies)
  } catch {
    res.status(500).json({
      message: 'Unable to get movies.',
    })
  }
}

export async function createMovie(
  req: Request,
  res: Response
) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      res.status(401).json({
        message: 'You must be logged in.',
      })
      return
    }

    const { title, genre, status } = req.body

    const movie = await createMovieForUser(
      title,
      genre,
      status,
      userId
    )

    res.status(201).json(movie)
  } catch {
    res.status(500).json({
      message: 'Unable to create movie.',
    })
  }
}

export async function deleteMovie(
  req: Request,
  res: Response
) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      res.status(401).json({
        message: 'You must be logged in.',
      })
      return
    }

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(400).json({
        message: 'Invalid movie ID.',
      })
      return
    }

    const deletedMovie = await deleteMovieForUser(
      id,
      userId
    )

    if (!deletedMovie) {
      res.status(404).json({
        message: 'Movie not found.',
      })
      return
    }

    res.status(204).send()
  } catch {
    res.status(500).json({
      message: 'Unable to delete movie.',
    })
  }
}