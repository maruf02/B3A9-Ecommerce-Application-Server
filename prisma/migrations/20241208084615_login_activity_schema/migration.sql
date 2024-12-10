-- CreateTable
CREATE TABLE "LoginActivity" (
    "loginActivityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "loginAt" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "LoginActivity_pkey" PRIMARY KEY ("loginActivityId")
);
