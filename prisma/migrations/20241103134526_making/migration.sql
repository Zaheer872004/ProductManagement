/*
  Warnings:

  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    MODIFY `isVerified` BOOLEAN NOT NULL DEFAULT false;
