/*
  Warnings:

  - You are about to drop the column `endX` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `endY` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `startX` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `startY` on the `characters` table. All the data in the column will be lost.
  - Added the required column `endx` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endy` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startx` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starty` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "endX",
DROP COLUMN "endY",
DROP COLUMN "startX",
DROP COLUMN "startY",
ADD COLUMN     "endx" INTEGER NOT NULL,
ADD COLUMN     "endy" INTEGER NOT NULL,
ADD COLUMN     "startx" INTEGER NOT NULL,
ADD COLUMN     "starty" INTEGER NOT NULL;
