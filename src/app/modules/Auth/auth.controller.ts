import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // Set to `true` in production with HTTPS
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Logged in successfully!",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error: any) {
    if (error.message === "Email not found") {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: true,
        message: "Email incorrect",
        data: null,
      });
    } else if (error.message === "Password incorrect") {
      sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: true,
        message: "Password not match",
        data: null,
      });
    } else if (error.message === "Your account is blocked") {
      sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: true,
        message: "Your account is blocked",
        data: null,
      });
    } else if (error.message === "Your account is deleted") {
      sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: true,
        message: "Your account is deleted",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: true,
        message: "Internal server error",
        data: null,
      });
    }
  }
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    try {
      const user = req.user;
      console.log(user);
      const result = await AuthServices.changePassword(user, req.body);

      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Password Changed successfully",
        data: result,
      });
    } catch (err: any) {
      if (err.message === "Password incorrect!") {
        sendResponse(res, {
          statusCode: StatusCodes.UNAUTHORIZED,
          success: true,
          message: "Password not match",
          data: null,
        });
      }
    }
  }
);

export const AuthController = {
  loginUser,
  changePassword,
};
