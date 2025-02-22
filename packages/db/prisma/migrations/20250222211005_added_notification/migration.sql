-- AlterTable
ALTER TABLE "PollingLinks" ADD COLUMN     "discordUrl" TEXT,
ADD COLUMN     "notify" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Polling_History" ALTER COLUMN "LastPolledStatus" SET DEFAULT 'Polling will start Soon';
