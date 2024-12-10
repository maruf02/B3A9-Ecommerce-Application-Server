-- CreateTable
CREATE TABLE "products" (
    "productsId" TEXT NOT NULL,
    "shopNameM" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT,
    "discount" TEXT NOT NULL DEFAULT 'No',
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "isFlashSale" TEXT NOT NULL DEFAULT 'No',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productsId")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "shop_name"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
