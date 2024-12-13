import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { FollowShopService } from "./FollowShop.service";

const createFollowShop = catchAsync(async (req: Request, res: Response) => {
  const followShopData = req.body;
  console.log("followShopData", followShopData);
  const result = await FollowShopService.createFollowShop(followShopData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "FollowShop created successfully",
    data: result,
  });
});

const getAllFollowShops = catchAsync(async (req: Request, res: Response) => {
  const result = await FollowShopService.getAllFollowShops();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "FollowShops retrieved successfully",
    data: result,
  });
});

const getFollowShopsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await FollowShopService.getFollowShopsByUserId(userId);
    if (!result) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "You don't follow this vendor",
        data: null,
      });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "FollowShops by user retrieved successfully",
      data: result,
    });
  }
);

const getFollowShopsByVendorId = catchAsync(
  async (req: Request, res: Response) => {
    const { vendorId } = req.params;
    const result = await FollowShopService.getFollowShopsByVendorId(vendorId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "FollowShops by vendor retrieved successfully",
      data: result,
    });
  }
);

// const deleteFollowShopsByUserId = catchAsync(
//   async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     await FollowShopService.deleteFollowShopsByUserId(userId);

//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: "FollowShops by user deleted successfully",
//       data: null,
//     });
//   }
// );

const deleteFollowShopByUserAndVendor = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, vendorId } = req.params;

    // Call service to delete follow shop
    const followShop = await FollowShopService.deleteFollowShopByUserAndVendor(
      userId,
      vendorId
    );

    // If no follow shop is found, return an error message
    if (!followShop) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "You don't follow this vendor",
        data: null,
      });
    }

    // Return success response
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "FollowShop by user and vendor deleted successfully",
      data: null,
    });
  }
);

const getFollowStatus = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userId = req.user.userId;
    const { vendorId } = req.params;
    console.log("object", req.params, userId);
    // Call service to check follow status
    const followShop = await FollowShopService.getFollowStatusByUserAndVendor(
      userId,
      vendorId
    );

    console.log("followShop", followShop);

    const followId = followShop?.followId;
    const isDeleted = followShop?.isDeleted;
    // If no follow shop record found
    if (followId && !isDeleted) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "NeedUnFollow",
        data: null,
      });
    } else {
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "NeedFollow",
        data: null,
      });
    }

    // Check if follow shop exists and is not deleted (followed)

    // Check if follow shop exists and is deleted (unfollowed)
  }
);

export const FollowShopController = {
  createFollowShop,
  getAllFollowShops,
  getFollowShopsByUserId,
  getFollowShopsByVendorId,
  //   deleteFollowShopsByUserId,
  deleteFollowShopByUserAndVendor,
  getFollowStatus,
};
