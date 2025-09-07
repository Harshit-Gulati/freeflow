/*
  Warnings:

  - You are about to drop the column `userId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_userId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "orgId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "by_user_board" ON "UserFavorite"("userId", "boardId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_boardId_key" ON "UserFavorite"("userId", "boardId");

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
