/*
  Warnings:

  - The `LastPolledStatus` column on the `Polling_History` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PolledStatus" AS ENUM ('UP', 'DOWN', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Polling_History" ADD COLUMN     "Latency" DOUBLE PRECISION,
DROP COLUMN "LastPolledStatus",
ADD COLUMN     "LastPolledStatus" "PolledStatus" NOT NULL DEFAULT 'UNKNOWN';
