import { prisma } from "../server/db/client";

export async function getUserIdsInDatabase() {
  const results = await prisma.user.findMany({
    select: { id: true },
  });
  return results.map((result) => result.id);
}

export async function getGameIdsInDatabase() {
  const results = await prisma.game.findMany({
    select: { id: true },
  });
  return results.map((result) => result.id);
}

export async function getClipIdsInDatabase() {
  const results = await prisma.clip.findMany({
    select: { id: true },
  });
  return results.map((result) => result.id);
}
