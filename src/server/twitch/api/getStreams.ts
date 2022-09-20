import { ApiClient } from "@twurple/api";
import { Game, User } from "@prisma/client";

export const wrappedGetStreams = (twitch: ApiClient) => async () => {
  const result = await twitch.streams.getStreams({ language: "ja" });
  const users = result.data.map<User>(
    ({ userId, userName, userDisplayName }) => ({
      id: userId,
      name: userName,
      displayName: userDisplayName,
    })
  );
  const games: Game[] = [];
  for (const { gameId, gameName } of result.data) {
    if (games.every((game) => game.id != gameId)) {
      games.push({ id: gameId, name: gameName });
    }
  }
  return { users, games };
};
