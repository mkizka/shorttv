import { createRouter } from "./context";
import { prisma } from "../db/client";

export const exampleRouter = createRouter() //
  .query("getStreams", {
    async resolve() {
      return await prisma.user.findMany();
    },
  });
