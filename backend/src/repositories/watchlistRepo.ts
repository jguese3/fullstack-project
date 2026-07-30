// watchlistRepo — Sprint 5: WatchlistEntry is now per-user.
// All queries are scoped by userId (our DB id, not Clerk's).

import prisma from '../prisma/client';
import { WatchlistEntry, Movie } from '@prisma/client';

export type WatchlistEntryWithMovie = WatchlistEntry & { movie: Movie };

const watchlistRepo = {
  async getAllForUser(userId: number): Promise<WatchlistEntryWithMovie[]> {
    return prisma.watchlistEntry.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { addedAt: 'desc' },
    });
  },

  async findByMovieAndUser(movieId: number, userId: number): Promise<WatchlistEntry | null> {
    return prisma.watchlistEntry.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });
  },

  async add(movieId: number, userId: number): Promise<WatchlistEntryWithMovie> {
    return prisma.watchlistEntry.create({
      data: { movieId, userId },
      include: { movie: true },
    });
  },

  async remove(movieId: number, userId: number): Promise<void> {
    await prisma.watchlistEntry.delete({
      where: { userId_movieId: { userId, movieId } },
    });
  },

  async toggleWatched(movieId: number, userId: number, watched: boolean): Promise<WatchlistEntryWithMovie> {
    return prisma.watchlistEntry.update({
      where: { userId_movieId: { userId, movieId } },
      data: { watched },
      include: { movie: true },
    });
  },
};

export default watchlistRepo;
