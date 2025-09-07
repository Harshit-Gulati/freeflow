/*
  Warnings:

  - You are about to drop the column `layer` on the `shapes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `shapes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "shapes" DROP COLUMN "layer";

-- CreateIndex
CREATE UNIQUE INDEX "shapes_id_key" ON "shapes"("id");
