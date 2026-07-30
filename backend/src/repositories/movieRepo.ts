// movieRepo — sole manager of Movie data access via Prisma.
//
// Responsibilities (this layer only):
//   - Translate CRUD operations into Prisma client calls
//   - Return plain data objects to the service layer
//
// This layer does NOT validate business rules — that belongs to movieService.
// This layer does NOT know about HTTP — that belongs to the controller.

import prisma from '../prisma/client';
import { Movie } from '@prisma/client';

const movieRepo = {
  async getAll(): Promise<Movie[]> {
    return prisma.movie.findMany({ orderBy: { id: 'asc' } });
  },

  async getById(id: number): Promise<Movie | null> {
    return prisma.movie.findUnique({ where: { id } });
  },
};

export default movieRepo;
