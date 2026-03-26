-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FEEDING', 'SLEEP', 'DIAPER', 'NOTE');

-- CreateEnum
CREATE TYPE "FeedingMethod" AS ENUM ('BREAST', 'BOTTLE', 'FORMULA');

-- CreateEnum
CREATE TYPE "DiaperType" AS ENUM ('WET', 'DIRTY', 'MIXED');

-- CreateTable
CREATE TABLE "Baby" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Baby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "babyId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "amountMl" INTEGER,
    "feedingMethod" "FeedingMethod",
    "diaperType" "DiaperType",
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Baby_userId_createdAt_idx" ON "Baby"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_userId_startedAt_idx" ON "Event"("userId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "Event_babyId_startedAt_idx" ON "Event"("babyId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "Event_userId_type_startedAt_idx" ON "Event"("userId", "type", "startedAt" DESC);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
