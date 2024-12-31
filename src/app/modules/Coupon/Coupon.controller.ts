import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { CouponService } from "./Coupon.service";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const CouponData = req.body;
  const result = await CouponService.createCoupon(CouponData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Coupon created successfully",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponService.getAllCoupons();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupons retrieved successfully",
    data: result,
  });
});

const getCouponById = catchAsync(async (req: Request, res: Response) => {
  const { CouponId } = req.params;
  const result = await CouponService.getCouponById(CouponId);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Coupon not found",
      data: result,
    });

    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupons retrieved successfully",
    data: result,
  });
});

const getCouponByVendorId = catchAsync(async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const result = await CouponService.getCouponByVendorId(vendorId);

  if (!result || result.length === 0) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "No coupons found for this vendor",
      data: result,
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupons retrieved successfully",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  const { couponId } = req.params;
  const updateData = req.body;
  console.log(couponId, updateData);
  const result = await CouponService.updateCoupon(couponId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon updated successfully",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const { couponId } = req.params;
  console.log(couponId);
  await CouponService.deleteCoupon(couponId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Coupon successfully deleted",
    data: null,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  getCouponByVendorId,
};
