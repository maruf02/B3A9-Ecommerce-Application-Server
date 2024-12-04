import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let statusCode = 400;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err) {
    message = "Validation Error";
    error = err.message;
  } else if (err) {
    if (err.code === "P2002") {
      message = "Duplicate Key error";
      error = err.meta;
    }
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
