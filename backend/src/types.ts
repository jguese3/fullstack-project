// Shared type definitions for the back-end application.
// These describe the shape of data sent to/from the front-end over HTTP.
// The actual database row types are inferred automatically from Prisma.

export type Genre =
  | 'Action' | 'Comedy' | 'Drama' | 'Horror' | 'Sci-Fi'
  | 'Thriller' | 'Romance' | 'Animation' | 'Documentary' | 'Fantasy';

export interface CreateReviewInput {
  movieId: number;
  text: string;
  rating: number;
}
