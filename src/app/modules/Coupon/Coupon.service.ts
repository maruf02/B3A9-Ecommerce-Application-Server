import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCoupon = async (couponData: any) => {
  return await prisma.coupon.create({
    data: couponData,
  });
};

const getAllCoupons = async () => {
  const result = await prisma.coupon.findMany({
    where: { isDeleted: false },
  });
  return result;
};

const getCouponById = async (couponId: string) => {
  const result = await prisma.coupon.findUnique({
    where: { couponId },
  });
  return result;
};

const getCouponByVendorId = async (vendorId: string) => {
  const result = await prisma.coupon.findMany({
    where: { vendorId },
  });
  return result;
};

const updateCoupon = async (couponId: string, updateData: any) => {
  const result = await prisma.coupon.update({
    where: { couponId },
    data: updateData,
  });
  return result;
};

const deleteCoupon = async (couponId: string) => {
  const result = await prisma.coupon.update({
    where: { couponId },
    data: { isDeleted: true },
  });
  return result;
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getCouponByVendorId,
};
