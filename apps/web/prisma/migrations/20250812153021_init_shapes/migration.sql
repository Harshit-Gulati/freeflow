/*
  Warnings:

  - You are about to drop the `CanvasShape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CanvasShape" DROP CONSTRAINT "CanvasShape_boardId_fkey";

-- DropTable
DROP TABLE "CanvasShape";

-- CreateTable
CREATE TABLE "shapes" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "layer" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shapes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shapes_boardId_idx" ON "shapes"("boardId");

-- AddForeignKey
ALTER TABLE "shapes" ADD CONSTRAINT "shapes_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
