// watchlistRepo — sole manager of WatchlistEntry data access via Prisma.
//
// Responsibilities (this layer only):
//   - Translate CRUD operations into Prisma client calls
//   - Include the related Movie record so the front-end doesn't need a
//     second round trip to display watchlist contents
//
// This layer does NOT validate business rules — that belongs to watchlistService.

import prisma from '../prisma/client';
import { WatchlistEntry, Movie } from '@prisma/client';

export type WatchlistEntryWithMovie = WatchlistEntry & { movie: Movie };

const watchlistRepo = {
  async getAll(): Promise<WatchlistEntryWithMovie[]> {
    return prisma.watchlistEntry.findMany({
      include: { movie: true },
      orderBy: { addedAt: 'desc' },
    });
  },

  async findByMovieId(movieId: number): Promise<WatchlistEntry | null> {
    return prisma.watchlistEntry.findUnique({ where: { movieId } });
  },

  async add(movieId: number): Promise<WatchlistEntryWithMovie> {
    return prisma.watchlistEntry.create({
      data: { movieId },
      include: { movie: true },
    });
  },

  async remove(movieId: number): Promise<void> {
    await prisma.watchlistEntry.delete({ where: { movieId } });
  },

  async toggleWatched(movieId: number, watched: boolean): Promise<WatchlistEntryWithMovie> {
    return prisma.watchlistEntry.update({
      where: { movieId },
      data: { watched },
      include: { movie: true },
    });
  },
};

export default watchlistRepo;
