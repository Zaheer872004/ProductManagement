/*
  Warnings:

  - You are about to drop the column `email` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `phone_no` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Retailer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addharNo]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Retailer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addharNo` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Retailer` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Supplier` DROP COLUMN `email`,
    DROP COLUMN `feedback`,
    DROP COLUMN `phone_no`,
    ADD COLUMN `addharNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Retailer_userId_key` ON `Retailer`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_userId_key` ON `Supplier`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_addharNo_key` ON `Supplier`(`addharNo`);

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Retailer` ADD CONSTRAINT `Retailer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
