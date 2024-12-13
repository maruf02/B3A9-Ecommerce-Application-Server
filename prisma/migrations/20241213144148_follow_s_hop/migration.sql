-- CreateTable
CREATE TABLE "follow_shop" (
    "followId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_shop_pkey" PRIMARY KEY ("followId")
);

-- AddForeignKey
ALTER TABLE "follow_shop" ADD CONSTRAINT "follow_shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_shop" ADD CONSTRAINT "follow_shop_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "shop_name"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
