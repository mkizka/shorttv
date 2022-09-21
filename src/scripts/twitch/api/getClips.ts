import { Clip } from "@prisma/client";
import { ApiClient, HelixPaginatedClipFilter } from "@twurple/api";

export const wrappedGetClipsForBroadcaster =
  (twitch: ApiClient) =>
  async (userId: string, filter?: HelixPaginatedClipFilter) => {
    const clips = await twitch.clips.getClipsForBroadcaster(userId, filter);
    return clips.data.map<Clip>(
      ({
        id,
        url,
        embedUrl,
        broadcasterId,
        videoId,
        gameId,
        language,
        title,
        creationDate,
        thumbnailUrl,
        duration,
      }) => {
        return {
          id,
          url,
          embedUrl,
          broadcasterId,
          videoId,
          gameId,
          language,
          title,
          createdAt: creationDate,
          thumbnailUrl,
          duration,
        };
      }
    );
  };
