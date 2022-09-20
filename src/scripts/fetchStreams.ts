import { prisma } from "../server/db/client";
import { twitch } from "../server/twitch/client";

async function getUserIdsInDatabase() {
  const results = await prisma.user.findMany({
    select: { id: true },
  });
  return results.map((result) => result.id);
}

async function getGameIdsInDatabase() {
  const results = await prisma.game.findMany({
    select: { id: true },
  });
  return results.map((result) => result.id);
}

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

main();
