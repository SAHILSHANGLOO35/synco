/*
  Warnings:

  - You are about to drop the `ZapRunOutbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_syncRunId_fkey";

-- DropTable
DROP TABLE "ZapRunOutbox";

-- CreateTable
CREATE TABLE "SyncRunOutbox" (
    "id" TEXT NOT NULL,
    "syncRunId" TEXT NOT NULL,

    CONSTRAINT "SyncRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SyncRunOutbox_syncRunId_key" ON "SyncRunOutbox"("syncRunId");

-- AddForeignKey
ALTER TABLE "SyncRunOutbox" ADD CONSTRAINT "SyncRunOutbox_syncRunId_fkey" FOREIGN KEY ("syncRunId") REFERENCES "syncRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
