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

// const getAllProducts = async (query: any) => {
//   const { page = 1, limit = 10, search = "", category } = query;

//   const offset = (page - 1) * limit;

//   const whereClause: any = {
//     isDeleted: false,
//   };

//   if (search) {
//     whereClause.name = {
//       contains: search,
//       mode: "insensitive", // Case-insensitive search
//     };
//   }

//   if (category) {
//     whereClause.category = category;
//   }

//   const products = await prisma.productData.findMany({
//     where: whereClause,
//     skip: offset,
//     take: Number(limit),
//     include: { shopName: true },
//   });

//   const totalProducts = await prisma.productData.count({
//     where: whereClause,
//   });

//   return { products, totalProducts };
// };

const getAllProducts = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const total = await prisma.productData.count({
    where: { isDeleted: false },
  });

  const products = await prisma.productData.findMany({
    where: { isDeleted: false },
    skip: offset,
    take: limit,
    include: { shopName: true },
  });

  return { products, total };
};

const getAllProductsByVendorId = async (vendorId: string) => {
  const result = await prisma.productData.findMany({
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

const getProductsByCartIds = async (productIds: string[]) => {
  console.log("productIds received by service:", productIds);

  const results = await prisma.productData.findMany({
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
  getAllProductsByVendorId,
  getProductsByCartIds,
};
