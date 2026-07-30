// reviewRepo — Sprint 5: Review is now per-user.
// All writes include userId; reads can be global (all reviews for a movie)
// or scoped (all reviews by a user).

import prisma from '../prisma/client';
import { Review } from '@prisma/client';

const reviewRepo = {
  async getAll(): Promise<Review[]> {
    return prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async getAllForUser(userId: number): Promise<Review[]> {
    return prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(movieId: number, userId: number, text: string, rating: number): Promise<Review> {
    return prisma.review.create({ data: { movieId, userId, text, rating } });
  },

  async findById(id: number): Promise<Review | null> {
    return prisma.review.findUnique({ where: { id } });
  },

  async delete(id: number): Promise<void> {
    await prisma.review.delete({ where: { id } });
  },
};

export default reviewRepo;
