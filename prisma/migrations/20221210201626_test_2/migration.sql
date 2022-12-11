/*
  Warnings:

  - You are about to drop the column `distance` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `hours_required` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `is_round_trip` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `passenger_count` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `quote_number` on the `Quote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Quote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passenger_count_label` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passenger_count_value` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_type_label` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_type_value` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_type_label` to the `Quote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_type_value` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quote` DROP COLUMN `distance`,
    DROP COLUMN `hours_required`,
    DROP COLUMN `is_round_trip`,
    DROP COLUMN `passenger_count`,
    DROP COLUMN `price`,
    DROP COLUMN `quote_number`,
    ADD COLUMN `hours_required_label` VARCHAR(191) NULL,
    ADD COLUMN `hours_required_value` INTEGER NULL,
    ADD COLUMN `passenger_count_label` VARCHAR(191) NOT NULL,
    ADD COLUMN `passenger_count_value` INTEGER NOT NULL,
    ADD COLUMN `service_type_label` VARCHAR(191) NOT NULL,
    ADD COLUMN `service_type_value` INTEGER NOT NULL,
    ADD COLUMN `vehicle_type_label` VARCHAR(191) NOT NULL,
    ADD COLUMN `vehicle_type_value` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Quote_id_key` ON `Quote`(`id`);
