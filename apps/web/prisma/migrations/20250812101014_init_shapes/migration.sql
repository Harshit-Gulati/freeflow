/*
  Warnings:

  - You are about to drop the `Element` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserFavorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId]` on the table `UserFavorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Element" DROP CONSTRAINT "Element_boardId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavorite" DROP CONSTRAINT "UserFavorite_boardId_fkey";

-- DropIndex
DROP INDEX "by_user_board";

-- DropTable
DROP TABLE "Element";

-- CreateTable
CREATE TABLE "CanvasShape" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardId" TEXT,

    CONSTRAINT "CanvasShape_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Board_id_key" ON "Board"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_id_key" ON "UserFavorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_boardId_key" ON "UserFavorite"("boardId");

-- CreateIndex
CREATE INDEX "UserFavorite_userId_idx" ON "UserFavorite"("userId");

-- AddForeignKey
ALTER TABLE "CanvasShape" ADD CONSTRAINT "CanvasShape_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
