import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
// const catchAsync =
//   (fn: Function) => (req: Request, res: Response, next: Function) => {
//     Promise.resolve(fn(req, res, next)).catch(next(err)); // Pass errors to the next error handler
//   };

export default catchAsync;
