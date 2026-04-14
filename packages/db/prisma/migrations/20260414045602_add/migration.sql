/*
  Warnings:

  - You are about to drop the `syncRun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SyncRunOutbox" DROP CONSTRAINT "SyncRunOutbox_syncRunId_fkey";

-- DropForeignKey
ALTER TABLE "syncRun" DROP CONSTRAINT "syncRun_syncId_fkey";

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "syncRun";

-- CreateTable
CREATE TABLE "SyncRun" (
    "id" TEXT NOT NULL,
    "syncId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "SyncRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SyncRun" ADD CONSTRAINT "SyncRun_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncRunOutbox" ADD CONSTRAINT "SyncRunOutbox_syncRunId_fkey" FOREIGN KEY ("syncRunId") REFERENCES "SyncRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
