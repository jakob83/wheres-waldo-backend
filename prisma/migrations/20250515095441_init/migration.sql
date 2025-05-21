-- CreateTable
CREATE TABLE "runs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "runs_pkey" PRIMARY KEY ("id")
);
