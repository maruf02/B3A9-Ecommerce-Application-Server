import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createFollowShop = async (followShopData: {
  userId: string;
  vendorId: string;
}) => {
  const { userId, vendorId } = followShopData;

  // Check if the followShop entry already exists

  // Create a new Category
  return await prisma.followShop.create({
    data: {
      userId,
      vendorId,
    },
  });
};

const getAllFollowShops = async () => {
  return await prisma.followShop.findMany({
    where: { isDeleted: false },
    include: {
      user: true,
      vendor: true,
    },
  });
};

const getFollowShopsByUserId = async (userId: string) => {
  return await prisma.followShop.findMany({
    where: { userId, isDeleted: false },
    include: { vendor: true },
  });
};

const getFollowShopsByVendorId = async (vendorId: string) => {
  return await prisma.followShop.findMany({
    where: { vendorId, isDeleted: false },
    include: { user: true },
  });
};

// const deleteFollowShopsByUserId = async (userId: string) => {
//   return await prisma.followShop.updateMany({
//     where: { userId, isDeleted: false },
//     data: { isDeleted: true },
//   });
// };

const deleteFollowShopByUserAndVendor = async (
  userId: string,
  vendorId: string
) => {
  // Find follow shop record that matches userId, vendorId, and is not deleted
  const followShop = await prisma.followShop.findFirst({
    where: { userId, vendorId },
  });

  // If no matching record is found, return null (this will be checked in controller)
  if (!followShop) {
    return null;
  }

  // Permanently delete the record where userId and vendorId match
  await prisma.followShop.deleteMany({
    where: { userId, vendorId },
  });

  return followShop; // Optionally return the deleted record
};

const getFollowStatusByUserAndVendor = async (
  userId: string,
  vendorId: string
) => {
  // Find follow shop record that matches userId and vendorId
  const followShop = await prisma.followShop.findFirst({
    where: { userId, vendorId },
  });

  // If no matching record found, return null
  return followShop;
};

export const FollowShopService = {
  createFollowShop,
  getAllFollowShops,
  getFollowShopsByUserId,
  getFollowShopsByVendorId,
  //   deleteFollowShopsByUserId,
  deleteFollowShopByUserAndVendor,
  getFollowStatusByUserAndVendor,
};
