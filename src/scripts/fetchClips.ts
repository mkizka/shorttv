import { prisma } from "../server/db/client";
import { twitch } from "./twitch/client";
import { getClipIdsInDatabase, getUserIdsInDatabase } from "./utils";

const main = async () => {
  const clipIdsInDatabase = await getClipIdsInDatabase();
  const userIdsInDatabase = await getUserIdsInDatabase();
  const promises = userIdsInDatabase.map(async (userId) => {
    const clips = await twitch.getClips(userId);
    const newClips = clips.filter(
      (clip) => !clipIdsInDatabase.includes(clip.id)
    );
    for (const clip of newClips) {
      await prisma.clip.create({ data: clip });
    }
    return newClips;
  });
  await Promise.all(promises);
};

main().catch(console.error);
