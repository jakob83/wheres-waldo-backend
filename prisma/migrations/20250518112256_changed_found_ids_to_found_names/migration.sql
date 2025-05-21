/*
  Warnings:

  - You are about to drop the column `foundId` on the `runs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "runs" DROP COLUMN "foundId",
ADD COLUMN     "foundCharacters" TEXT[];
