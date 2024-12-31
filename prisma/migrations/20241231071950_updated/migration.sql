/*
  Warnings:

  - Added the required column `discountAmount` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "discountAmount" INTEGER NOT NULL;
