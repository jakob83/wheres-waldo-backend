/*
  Warnings:

  - You are about to drop the column `time` on the `runs` table. All the data in the column will be lost.
  - Added the required column `end` to the `runs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `runs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "runs" DROP COLUMN "time",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'running';
