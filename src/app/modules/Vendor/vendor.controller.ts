import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { VendorService } from "./vendor.service";

const createVendor = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const VendorData = req.body;
    const user = req.user;
    console.log(VendorData);
    const result = await VendorService.createVendor(user, VendorData);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Vendor created successfully",
      data: result,
    });
  }
);

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorService.getAllVendors();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendors retrieved successfully",
    data: result,
  });
});

const getVendorById = catchAsync(async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const result = await VendorService.getVendorById(vendorId);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Vendor not found",
      data: result,
    });

    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendors retrieved successfully",
    data: result,
  });
});

const getVendorByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await VendorService.getVendorByEmail(email);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Vendor not found",
      data: result,
    });
    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendors retrieved successfully",
    data: result,
  });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const updateData = req.body;
  const result = await VendorService.updateVendor(vendorId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendor updated successfully",
    data: result,
  });
});

const deleteVendor = catchAsync(async (req: Request, res: Response) => {
  const { VendorId } = req.params;
  await VendorService.deleteVendor(VendorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendor successfully deleted",
    data: null,
  });
});

export const VendorController = {
  createVendor,
  getAllVendors,
  getVendorById,
  getVendorByEmail,
  updateVendor,
  deleteVendor,
};
