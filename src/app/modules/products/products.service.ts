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
  return await prisma.product.create({
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

const getAllProducts = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const total = await prisma.product.count({
    where: { isDeleted: false },
  });

  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    skip: offset,
    take: limit,
    include: { shopName: true },
  });

  return { products, total };
};

const getAllSProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const getAllProductsByVendorId = async (vendorId: string) => {
  const result = await prisma.product.findMany({
    where: {
      isDeleted: false,
      vendorId: vendorId, // Filter by vendorId
    },
    include: {
      shopName: true, // Include related shopName data if needed
    },
  });
  return result;
};
const getAllProductsByVendorIdP = async (
  vendorId: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const total = await prisma.product.count({
    where: { isDeleted: false, vendorId: vendorId },
  });

  const result = await prisma.product.findMany({
    where: {
      isDeleted: false,
      vendorId: vendorId, // Filter by vendorId
    },
    skip: offset,
    take: limit,
    include: {
      shopName: true, // Include related shopName data if needed
    },
  });

  return { result, total };
};

const getProductById = async (productId: string) => {
  const result = await prisma.product.findUnique({
    where: { productId },
    include: { shopName: true },
  });

  if (!result || result.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  return result;
};

const getProductsByCartIds = async (productIds: string[]) => {
  console.log("productIds received by service:", productIds);

  const results = await prisma.product.findMany({
    where: {
      productId: {
        in: productIds, // Match productId with the array of productIds
      },
      isDeleted: false, // Optional: Exclude deleted products
    },
    include: { shopName: true },
  });

  // Log the result to check what you get back
  console.log("Products found:", results);

  if (results.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "Products not foundddddd");
  }

  return results;
};

const getProductByEmail = async (
  email: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const total = await prisma.product.count({
    where: { isDeleted: false },
  });

  const shop = await prisma.shopName.findUnique({
    where: { email },
  });

  if (!shop) {
    throw new AppError(StatusCodes.NOT_FOUND, "Shop not found");
  }

  const result = await prisma.product.findMany({
    where: {
      vendorId: shop.vendorId,
      isDeleted: false,
    },
    skip: offset,
    take: limit,
    include: { shopName: true },
  });

  return { result, total };
};

// const getProductByEmail = async (email: string) => {
//   const shop = await prisma.shopName.findUnique({
//     where: { email },
//   });

//   if (!shop) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Shop not found");
//   }

//   const result = await prisma.product.findMany({
//     where: {
//       vendorId: shop.vendorId,
//       isDeleted: false,
//     },
//   });

//   return result;
// };

const updateProduct = async (productId: string, updateData: any) => {
  const product = await prisma.product.findUnique({
    where: { productId },
  });

  if (!product || product.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  const result = await prisma.product.update({
    where: { productId },
    data: updateData,
  });

  return result;
};

const deleteProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { productId },
  });

  if (!product || product.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  await prisma.product.update({
    where: { productId },
    data: { isDeleted: true },
  });
};

const getAllFlashSaleProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isFlashSale: "Yes",
    },
  });

  return products;
};

const getAllProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
      category: category,
    },
    include: { shopName: true },
  });

  return products;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByEmail,
  updateProduct,
  deleteProduct,
  getAllProductsByVendorId,
  getProductsByCartIds,
  getAllSProducts,
  getAllProductsByVendorIdP,
  getAllFlashSaleProducts,
  getAllProductsByCategory,
};
