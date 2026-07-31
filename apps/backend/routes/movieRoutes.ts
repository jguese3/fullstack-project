import express from 'express'
import { requireAuth } from '@clerk/express'

import {
  getMovies,
  createMovie,
  deleteMovie,
} from '../controllers/movieController'

const router = express.Router()

router.get('/', requireAuth(), getMovies)

router.post('/', requireAuth(), createMovie)

router.delete('/:id', requireAuth(), deleteMovie)

export default router