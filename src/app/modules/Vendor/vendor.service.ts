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

const getAllVendors = async () => {
  const result = await prisma.shopName.findMany({
    where: { isDeleted: false },
    include: { user: true },
  });
  return result;
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
