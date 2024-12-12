/*
  Warnings:

  - Added the required column `userEmail` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorEmail` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "vendorEmail" TEXT NOT NULL;
