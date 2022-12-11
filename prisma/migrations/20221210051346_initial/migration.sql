-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quote_number` INTEGER NOT NULL,
    `pickup_date` DATETIME(3) NOT NULL,
    `pickup_time` DATETIME(3) NOT NULL,
    `pickup_location` VARCHAR(191) NOT NULL,
    `dropoff_location` VARCHAR(191) NOT NULL,
    `passengers` INTEGER NULL,
    `luggage` INTEGER NULL,
    `price` DOUBLE NULL,
    `distance` DOUBLE NULL,
    `is_round_trip` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quote` ADD CONSTRAINT `Quote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
