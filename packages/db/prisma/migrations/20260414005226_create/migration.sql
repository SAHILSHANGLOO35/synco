/*
  Warnings:

  - You are about to drop the column `actionId` on the `Sync` table. All the data in the column will be lost.
  - You are about to drop the column `triggerId` on the `Sync` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sync" DROP COLUMN "actionId",
DROP COLUMN "triggerId";

-- CreateTable
CREATE TABLE "syncRun" (
    "id" TEXT NOT NULL,
    "syncId" TEXT NOT NULL,

    CONSTRAINT "syncRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "syncRun" ADD CONSTRAINT "syncRun_syncId_fkey" FOREIGN KEY ("syncId") REFERENCES "Sync"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
