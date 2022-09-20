import { z } from "zod";

const parsedEnv = z
  .object({
    TWITCH_CLIENT_ID: z.string(),
    TWITCH_TOKEN: z.string(),
  })
  .safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.message);
}

export const env = { ...parsedEnv.data };
