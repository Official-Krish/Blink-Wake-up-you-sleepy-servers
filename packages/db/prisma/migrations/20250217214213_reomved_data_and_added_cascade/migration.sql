/*
  Warnings:

  - You are about to drop the column `data` on the `Polling_History` table. All the data in the column will be lost.
  - Added the required column `LastPolledStatus` to the `Polling_History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Polling_History" DROP CONSTRAINT "Polling_History_pollingId_fkey";

-- AlterTable
ALTER TABLE "Polling_History" DROP COLUMN "data",
ADD COLUMN     "LastPolledStatus" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Polling_History" ADD CONSTRAINT "Polling_History_pollingId_fkey" FOREIGN KEY ("pollingId") REFERENCES "PollingLinks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
