// reviewRepo — sole manager of Review data access via Prisma.
//
// Responsibilities (this layer only):
//   - Translate CRUD operations into Prisma client calls
//
// This layer does NOT validate business rules — that belongs to reviewService.

import prisma from '../prisma/client';
import { Review } from '@prisma/client';
import { CreateReviewInput } from '../types';

const reviewRepo = {
  async getAll(): Promise<Review[]> {
    return prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async create(input: CreateReviewInput): Promise<Review> {
    return prisma.review.create({ data: input });
  },

  async delete(id: number): Promise<void> {
    await prisma.review.delete({ where: { id } });
  },

  async findById(id: number): Promise<Review | null> {
    return prisma.review.findUnique({ where: { id } });
  },
};

export default reviewRepo;
