import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await userService.createUser(userData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.getUserById(userId);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "User not found",
      data: result,
    });

    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await userService.getUserByEmail(email);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "User not found",
      data: result,
    });
    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;
  const result = await userService.updateUser(userId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User successfully deleted",
    data: null,
  });
});
const followShop = catchAsync(async (req: Request, res: Response) => {
  const { userId, vendorId } = req.params;
  await userService.followShop(userId, vendorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User successfully deleted",
    data: null,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  followShop,
};
