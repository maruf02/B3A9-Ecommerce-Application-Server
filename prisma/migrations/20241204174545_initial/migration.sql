-- CreateTable
CREATE TABLE "members" (
    "memberId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "membershipDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("memberId")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
