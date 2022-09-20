import { createRouter } from "./context";
import { twitch } from "../twitch/client";

export const exampleRouter = createRouter() //
  .query("getStreams", {
    async resolve() {
      return await twitch.getStreams();
    },
  });
