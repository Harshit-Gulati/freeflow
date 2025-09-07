/*
  Warnings:

  - Added the required column `updatedAt` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Made the column `boardId` on table `CanvasShape` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CanvasShape" DROP CONSTRAINT "CanvasShape_boardId_fkey";

-- DropIndex
DROP INDEX "Board_id_key";

-- DropIndex
DROP INDEX "UserFavorite_boardId_key";

-- DropIndex
DROP INDEX "UserFavorite_id_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CanvasShape" ALTER COLUMN "boardId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "CanvasShape_boardId_idx" ON "CanvasShape"("boardId");

-- AddForeignKey
ALTER TABLE "CanvasShape" ADD CONSTRAINT "CanvasShape_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
