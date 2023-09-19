/*
  Warnings:

  - You are about to drop the column `userName` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userName",
ADD COLUMN     "name" TEXT;
