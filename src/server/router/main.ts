import { createRouter } from "./context";
import { prisma } from "../db/client";

export const mainRouter = createRouter() //
  .query("getClips", {
    async resolve() {
      return await prisma.clip.findMany({
        where: {
          duration: { lte: 20 },
        },
        take: 5,
      });
    },
  });
