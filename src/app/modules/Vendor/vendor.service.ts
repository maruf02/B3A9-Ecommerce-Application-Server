import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createVendor = async (user: any, vendorData: any) => {
  const { shopName } = vendorData;
  const { email, userId } = user;

  // Check if email already exists
  const existingVendor = await prisma.shopName.findUnique({
    where: { email },
  });

  if (existingVendor) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Brand already register in this email"
    );
  }

  // Create a new vendor
  return await prisma.shopName.create({
    data: {
      shopName,
      email,
      userId,
    },
  });
};

// const getAllVendors = async () => {
//   const result = await prisma.shopName.findMany({
//     where: { isDeleted: false },
//     include: { user: true },
//   });
//   return result;
// };
const getAllVendors = async () => {
  // Fetch all vendors
  const vendors = await prisma.shopName.findMany({
    where: { isDeleted: false },
    include: { user: true }, // Include associated user details
  });

  // Map through vendors and fetch product counts
  const vendorsWithProductCounts = await Promise.all(
    vendors.map(async (vendor) => {
      const productCount = await prisma.product.count({
        where: {
          vendorId: vendor.vendorId, // Count products by matching vendorId
          isDeleted: false, // Only count non-deleted products
        },
      });

      return {
        ...vendor,
        productCount, // Add the product count to the vendor data
      };
    })
  );

  return vendorsWithProductCounts;
};

const getVendorById = async (vendorId: string) => {
  const result = await prisma.shopName.findUnique({
    where: { vendorId },
    include: { user: true },
  });
  return result;
};

const getVendorByEmail = async (email: string) => {
  const result = await prisma.shopName.findUnique({
    where: { email },
    include: { user: true },
  });
  return result;
};

const updateVendor = async (vendorId: string, updateData: any) => {
  const result = await prisma.shopName.update({
    where: { vendorId },
    data: updateData,
  });
  return result;
};

const deleteVendor = async (vendorId: string) => {
  const result = await prisma.shopName.update({
    where: { vendorId },
    data: { isDeleted: true },
  });
  return result;
};

export const VendorService = {
  createVendor,
  getAllVendors,
  getVendorById,
  getVendorByEmail,
  updateVendor,
  deleteVendor,
};
