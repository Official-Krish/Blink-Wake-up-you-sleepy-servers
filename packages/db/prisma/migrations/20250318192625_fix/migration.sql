/*
  Warnings:

  - You are about to drop the column `pollingId` on the `PollingLinks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Polling_History_pollingId_key";

-- AlterTable
ALTER TABLE "PollingLinks" DROP COLUMN "pollingId";
