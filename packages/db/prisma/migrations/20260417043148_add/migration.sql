/*
  Warnings:

  - Added the required column `triggerId` to the `Sync` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sync" ADD COLUMN     "triggerId" TEXT NOT NULL;
