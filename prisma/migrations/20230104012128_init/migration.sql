/*
  Warnings:

  - You are about to drop the column `userId` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `emailAddress` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_userId_fkey";

-- DropIndex
DROP INDEX "Quote_userId_key";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "userId",
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
