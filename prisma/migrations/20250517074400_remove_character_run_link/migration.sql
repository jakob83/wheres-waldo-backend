-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_runId_fkey";

-- AlterTable
ALTER TABLE "characters" ALTER COLUMN "runId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_runId_fkey" FOREIGN KEY ("runId") REFERENCES "runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
