import express from 'express'

import {
  getMovies,
  createMovie,
  deleteMovie,
} from '../controllers/movieController'

import { requireAuth } from '@clerk/express'

const router = express.Router()

router.get('/', getMovies)

router.post('/', createMovie)

router.delete('/:id', requireAuth(), deleteMovie)

export default router