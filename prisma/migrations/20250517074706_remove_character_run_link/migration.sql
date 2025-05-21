/*
  Warnings:

  - You are about to drop the column `runId` on the `characters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_runId_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "runId";

-- AlterTable
ALTER TABLE "runs" ADD COLUMN     "foundId" TEXT[];
