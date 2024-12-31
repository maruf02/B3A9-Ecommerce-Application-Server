-- CreateTable
CREATE TABLE "coupon" (
    "couponId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "startedDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "isActive" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("couponId")
);

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "shop_name"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
