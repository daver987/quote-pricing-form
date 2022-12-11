/*
  Warnings:

  - You are about to drop the column `dropoff_location` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `luggage` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `passengers` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_date` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_location` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `pickup_time` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `drop_off_location` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pick_up_location` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Quote` DROP COLUMN `dropoff_location`,
    DROP COLUMN `luggage`,
    DROP COLUMN `passengers`,
    DROP COLUMN `pickup_date`,
    DROP COLUMN `pickup_location`,
    DROP COLUMN `pickup_time`,
    ADD COLUMN `drop_off_location` VARCHAR(191) NOT NULL,
    ADD COLUMN `hours_required` INTEGER NULL,
    ADD COLUMN `passenger_count` INTEGER NULL,
    ADD COLUMN `pick_up_date` DATETIME(3) NULL,
    ADD COLUMN `pick_up_location` VARCHAR(191) NOT NULL,
    ADD COLUMN `pick_up_time` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `email_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_address_key` ON `User`(`email_address`);
