// prisma.ts — instantiates and exports a single shared PrismaClient instance.
//
// Per Prisma's official recommendation, the client should be instantiated
// once and reused across the application rather than creating a new
// PrismaClient per request (which would exhaust database connections).
// See: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/instantiate-prisma-client

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
