import { z } from "zod";
import { shuffle } from "shuffle-seed";
import { Clip } from "@prisma/client";
import { createRouter } from "./context";

// SQLiteではシード値を使ったランダムソートが出来ないので
// 期間で数を絞って全部保持して、リクエスト時にshuffleする
let cachedClips: Clip[] | undefined;

export const mainRouter = createRouter() //
  .query("getClips", {
    input: z.object({
      seed: z.string(),
      cursor: z.number().nullish(),
    }),
    async resolve({ input, ctx: { prisma } }) {
      if (cachedClips == undefined) {
        cachedClips = await prisma.clip.findMany({
          where: {
            duration: { lte: 20 },
          },
          // TODO: 期間を絞る
        });
      }
      const currentCursor = input.cursor ?? 0;
      const nextCursor = currentCursor + 5;
      return {
        clips: shuffle(cachedClips, input.seed).slice(
          currentCursor,
          nextCursor
        ),
        nextCursor:
          nextCursor < cachedClips.length - 1 ? nextCursor : undefined,
      };
    },
  });
