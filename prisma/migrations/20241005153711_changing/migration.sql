/*
  Warnings:

  - Added the required column `expiryDate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `expiryDate` DATETIME(3) NOT NULL;
