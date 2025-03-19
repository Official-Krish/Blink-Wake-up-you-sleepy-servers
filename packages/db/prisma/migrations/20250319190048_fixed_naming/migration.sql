/*
  Warnings:

  - You are about to drop the column `LastPolledStatus` on the `Polling_History` table. All the data in the column will be lost.
  - You are about to drop the column `Latency` on the `Polling_History` table. All the data in the column will be lost.
  - You are about to drop the column `PolledAt` on the `Polling_History` table. All the data in the column will be lost.
  - Added the required column `CheckedAt` to the `Polling_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Polling_History" DROP COLUMN "LastPolledStatus",
DROP COLUMN "Latency",
DROP COLUMN "PolledAt",
ADD COLUMN     "CheckedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "responseTime" DOUBLE PRECISION,
ADD COLUMN     "status" "PolledStatus" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'No Title';
