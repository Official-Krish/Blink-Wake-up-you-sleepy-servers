-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollingLinks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pollingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PollingLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polling_History" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "PolledAt" TIMESTAMP(3) NOT NULL,
    "pollingId" TEXT NOT NULL,

    CONSTRAINT "Polling_History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Polling_History_pollingId_key" ON "Polling_History"("pollingId");

-- AddForeignKey
ALTER TABLE "PollingLinks" ADD CONSTRAINT "PollingLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Polling_History" ADD CONSTRAINT "Polling_History_pollingId_fkey" FOREIGN KEY ("pollingId") REFERENCES "PollingLinks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
