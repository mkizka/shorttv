// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).prisma = prisma;
}
