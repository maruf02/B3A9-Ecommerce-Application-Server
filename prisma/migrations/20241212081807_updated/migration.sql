/*
  Warnings:

  - Added the required column `shopName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorEmail` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shopName" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "vendorEmail" TEXT NOT NULL;
