/*
  Warnings:

  - You are about to alter the column `pickupDate` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `pickupTime` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `returnPickupDate` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `returnPickupTime` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `originFormattedAddress` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `originName` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `originPlaceId` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `destinationFormattedAddress` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `destinationName` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `destinationPlaceId` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `vehicleTypeLabel` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `serviceTypeLabel` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `passengersLabel` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `hoursLabel` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `distanceText` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `durationText` on the `Quote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- DropIndex
DROP INDEX "Quote_userId_key";

-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "pickupDate" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "pickupTime" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "returnPickupDate" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "returnPickupTime" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "originFormattedAddress" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "originName" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "originPlaceId" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "destinationFormattedAddress" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "destinationName" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "destinationPlaceId" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "vehicleTypeLabel" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "serviceTypeLabel" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "passengersLabel" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "hoursLabel" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "distanceText" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "durationText" SET DATA TYPE VARCHAR(200);
