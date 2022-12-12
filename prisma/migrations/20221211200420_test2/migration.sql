/*
  Warnings:

  - Added the required column `destination_place_id` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_place_id` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quote` ADD COLUMN `destination_place_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `origin_place_id` VARCHAR(191) NOT NULL;
