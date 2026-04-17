/*
  Warnings:

  - Added the required column `userId` to the `Sync` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sync" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
