// requireAuth.ts — Sprint 5
//
// Verifies the Clerk session token sent from the front-end in the
// Authorization header. On success, upserts the User record in our
// own database (using clerkId as the bridge) and attaches both the
// Clerk userId and our internal DB userId to the request.
//
// This satisfies:
//   T.2 — Clerk middleware authenticates users by Session Tokens
//   I.1 — The logged-in user's ID is used to scope data queries

import { Request, Response, NextFunction } from 'express';
import { createClerkClient } from '@clerk/express';
import prisma from '../prisma/client';

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export interface AuthenticatedRequest extends Request {
  clerkUserId?: string;
  dbUserId?: number;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: missing token.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token with Clerk
    const payload = await clerk.verifyToken(token);
    const clerkId = payload.sub;

    // Fetch user details from Clerk to get email
    const clerkUser = await clerk.users.getUser(clerkId);
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? `${clerkId}@unknown.com`;
    const displayName = clerkUser.firstName
      ? `${clerkUser.firstName} ${clerkUser.lastName ?? ''}`.trim()
      : undefined;

    // Upsert our own User record — creates on first login, updates on subsequent
    const dbUser = await prisma.user.upsert({
      where: { clerkId },
      update: { email, displayName: displayName ?? null },
      create: { clerkId, email, displayName: displayName ?? null },
    });

    req.clerkUserId = clerkId;
    req.dbUserId = dbUser.id;

    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized: invalid or expired token.' });
  }
};
