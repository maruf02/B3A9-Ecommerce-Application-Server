/*
  Warnings:

  - You are about to drop the `LoginActivity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LoginActivity";

-- CreateTable
CREATE TABLE "Login_activity" (
    "loginActivityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "loginAt" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Login_activity_pkey" PRIMARY KEY ("loginActivityId")
);
