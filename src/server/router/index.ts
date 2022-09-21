// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { mainRouter } from "./main";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("main.", mainRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
