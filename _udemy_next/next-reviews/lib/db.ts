import { PrismaClient } from '@prisma/client';

export const db = createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }
  return globalThis.prismaClient;
}
