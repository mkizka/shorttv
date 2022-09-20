import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

import { env } from "../../env/server.mjs";
import { wrappedGetStreams } from "./api/getStreams";

const authProvider = new StaticAuthProvider(
  env.TWITCH_CLIENT_ID,
  env.TWITCH_TOKEN
);

const api = new ApiClient({ authProvider });

export const twitch = {
  getStreams: wrappedGetStreams(api),
};
