// src/server/db/client.ts
import { PrismaClient } from "../../.prisma";
import { env } from "../../env/server";

export const prisma: PrismaClient =
  (global as any).prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}
