import { PrismaClient } from "@prisma/client";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createProduct = async (user: any, productData: any) => {
  const {
    name,
    price,
    category,
    description,
    quantity,
    mimage,
    image2,
    image3,
    image4,
    image5,
    discount,
    discountPrice,
    isFlashSale,
  } = productData;
  const { email } = user;

  const shop = await prisma.shopName.findUnique({
    where: { email },
  });

  if (!shop) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Shop not found for the provided user"
    );
  }

  // Get shopNameM from the shop entry
  const shopNameM = shop.shopName;

  // Create a new product
  return await prisma.productData.create({
    data: {
      shopNameM,
      email,
      name,
      price,
      category,
      description,
      quantity,
      mimage,
      image2,
      image3,
      image4,
      image5,
      discount,
      discountPrice,
      isFlashSale,
      vendorId: shop.vendorId,
    },
  });
};

const getAllProducts = async () => {
  const result = await prisma.productData.findMany({
    where: { isDeleted: false },
    include: { shopName: true },
  });
  return result;
};

const getProductById = async (productId: string) => {
  const result = await prisma.productData.findUnique({
    where: { productId },
    include: { shopName: true },
  });

  if (!result || result.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  return result;
};

const getProductByEmail = async (email: string) => {
  const shop = await prisma.shopName.findUnique({
    where: { email },
  });

  if (!shop) {
    throw new AppError(StatusCodes.NOT_FOUND, "Shop not found");
  }

  const result = await prisma.productData.findMany({
    where: {
      vendorId: shop.vendorId,
      isDeleted: false,
    },
  });

  return result;
};

const updateProduct = async (productId: string, updateData: any) => {
  const product = await prisma.productData.findUnique({
    where: { productId },
  });

  if (!product || product.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  const result = await prisma.productData.update({
    where: { productId },
    data: updateData,
  });

  return result;
};

const deleteProduct = async (productId: string) => {
  const product = await prisma.productData.findUnique({
    where: { productId },
  });

  if (!product || product.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  await prisma.productData.update({
    where: { productId },
    data: { isDeleted: true },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByEmail,
  updateProduct,
  deleteProduct,
};
