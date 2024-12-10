import { Request, Response } from "express";

import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { loginActivityServices } from "./loginActivity.service";

const createLoginActivity = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await loginActivityServices.createLoginActivity(req.body);
    console.log(result);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Login activity created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Invalid data") {
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Invalid login activity data",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Failed to create login activity",
        data: null,
      });
    }
  }
});

const getAllLoginActivities = catchAsync(
  async (_req: Request, res: Response) => {
    try {
      const result = await loginActivityServices.getAllLoginActivities();

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Login activities fetched successfully!",
        data: result,
      });
    } catch (error) {
      sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Failed to fetch login activities",
        data: null,
      });
    }
  }
);

export const LoginActivityController = {
  createLoginActivity,
  getAllLoginActivities,
};
