// movieController — translates HTTP requests into movieService calls.

import { Request, Response } from 'express';
import movieService from '../services/movieService';

const movieController = {
  // GET /api/movies
  async getAll(_req: Request, res: Response): Promise<void> {
    const movies = await movieService.getAll();
    res.status(200).json(movies);
  },
};

export default movieController;
