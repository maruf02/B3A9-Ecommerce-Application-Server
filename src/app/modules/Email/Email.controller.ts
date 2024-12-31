import { Request, Response } from "express";
import catchAsync from "../../helpers/cacheAsync";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import { EmailService } from "./Email.service";

const createEmail = catchAsync(async (req: Request, res: Response) => {
  const EmailData = req.body;
  const result = await EmailService.createEmail(EmailData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Email created successfully",
    data: result,
  });
});

const getAllEmails = catchAsync(async (req: Request, res: Response) => {
  const result = await EmailService.getAllEmails();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Emails retrieved successfully",
    data: result,
  });
});

export const EmailController = {
  createEmail,
  getAllEmails,
};
