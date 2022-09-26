import { z } from "zod";
import { shuffle } from "shuffle-seed";
import { Clip } from "@prisma/client";
import { createRouter } from "./context";

// SQLiteではシード値を使ったランダムソートが出来ないので
// 期間で数を絞って全部保持して、リクエスト時にshuffleする
let cachedClips: Clip[] | undefined;

export const mainRouter = createRouter() //
  .query("getClips", {
    input: z.object({ seed: z.string() }),
    async resolve({ input, ctx: { prisma } }) {
      if (cachedClips == undefined) {
        cachedClips = await prisma.clip.findMany({
          where: {
            duration: { lte: 20 },
          },
          // TODO: 期間を絞る
        });
      }
      return shuffle(cachedClips, input.seed).slice(0, 5);
    },
  });
