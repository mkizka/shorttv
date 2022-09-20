// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server";

export const prisma: PrismaClient =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).prisma = prisma;
}
