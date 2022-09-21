-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "embedUrl" TEXT NOT NULL,
    "broadcasterId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "duration" REAL NOT NULL
);
INSERT INTO "new_Clip" ("broadcasterId", "createdAt", "duration", "embedUrl", "gameId", "id", "language", "thumbnailUrl", "title", "url", "videoId") SELECT "broadcasterId", "createdAt", "duration", "embedUrl", "gameId", "id", "language", "thumbnailUrl", "title", "url", "videoId" FROM "Clip";
DROP TABLE "Clip";
ALTER TABLE "new_Clip" RENAME TO "Clip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
