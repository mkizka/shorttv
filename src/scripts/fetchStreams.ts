import { prisma } from "../server/db/client";
import { twitch } from "./twitch/client";
import { getGameIdsInDatabase, getUserIdsInDatabase } from "./utils";

async function main() {
  const { games, users } = await twitch.getStreams();
  const userIdsInDatabase = await getUserIdsInDatabase();
  const gameIdsInDatabase = await getGameIdsInDatabase();
  const newUsers = users.filter((user) => !userIdsInDatabase.includes(user.id));
  const newGames = games.filter((game) => !gameIdsInDatabase.includes(game.id));
  for (const user of newUsers) {
    await prisma.user.create({ data: user });
  }
  for (const game of newGames) {
    await prisma.game.create({ data: game });
  }
}

main().catch(console.error);
