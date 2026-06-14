export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  description: string;
  poster: string;
}

export interface WatchlistMovie extends Movie {
  status: "watched" | "watching" | "plan-to-watch";
  addedAt: string;
}

export type WatchStatus = "watched" | "watching" | "plan-to-watch";
