-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'VENDOR');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL,
    "isBlock" TEXT NOT NULL DEFAULT 'No',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "shop_name" (
    "vendorId" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "isBlock" TEXT NOT NULL DEFAULT 'No',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "shop_name_pkey" PRIMARY KEY ("vendorId")
);

-- CreateTable
CREATE TABLE "products_data" (
    "productId" TEXT NOT NULL,
    "shopNameM" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "mimage" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "image4" TEXT,
    "image5" TEXT,
    "discount" TEXT NOT NULL DEFAULT 'No',
    "discountPrice" DOUBLE PRECISION,
    "isFlashSale" TEXT NOT NULL DEFAULT 'No',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "products_data_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "category" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryImage" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Login_activity" (
    "loginActivityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "loginAt" TEXT NOT NULL,
    "device" TEXT NOT NULL,

    CONSTRAINT "Login_activity_pkey" PRIMARY KEY ("loginActivityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shop_name_email_key" ON "shop_name"("email");

-- AddForeignKey
ALTER TABLE "shop_name" ADD CONSTRAINT "shop_name_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_data" ADD CONSTRAINT "products_data_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "shop_name"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
