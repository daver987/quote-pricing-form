-- AlterTable
ALTER TABLE `Quote` MODIFY `quote_number` INTEGER NULL,
    MODIFY `pickup_date` DATETIME(3) NULL,
    MODIFY `pickup_time` VARCHAR(191) NULL;
