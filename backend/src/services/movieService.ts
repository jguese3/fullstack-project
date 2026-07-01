// movieService — business logic for Movie operations.
//
// What it does:
//   Provides a read-only pass-through to movieRepo, plus an existence
//   check used by watchlistService and reviewService.
//
// What it does NOT do:
//   Does not touch Prisma directly — that belongs to movieRepo.
//   Does not handle HTTP — that belongs to the controller.

import movieRepo from '../repositories/movieRepo';
import { Movie } from '@prisma/client';

const movieService = {
  async getAll(): Promise<Movie[]> {
    return movieRepo.getAll();
  },

  async getById(id: number): Promise<Movie | null> {
    return movieRepo.getById(id);
  },

  async exists(id: number): Promise<boolean> {
    const movie = await movieRepo.getById(id);
    return movie !== null;
  },
};

export default movieService;
