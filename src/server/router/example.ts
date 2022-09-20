import { createRouter } from "./context";
import { twitch } from "../twitch/client";

export const exampleRouter = createRouter() //
  .query("getStreams", {
    async resolve({ input }) {
      return await twitch.getStreams();
    },
  });
