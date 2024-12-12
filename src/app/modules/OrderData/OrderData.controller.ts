import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { OrderService } from "./OrderData.service";
import catchAsyncP from "../../helpers/cacheAsyncP";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);
  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    // Get the transactionId from query parameters
    const { transactionId } = req.query;

    // Ensure transactionId is a string, since query parameters are always strings by default
    if (typeof transactionId !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
    }

    // Call the confirmation service to process the payment
    const result = await OrderService.confirmationService(transactionId);

    // Return the success response as HTML
    res.send(`
      <html>
        <head>
          <title>Payment Successful</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: green; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; text-decoration: none; color: white; background-color: #007bff; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Payment Successful</h1>
          <p>Your payment has been successfully processed.</p>
          <a href="http://localhost:5173/commentPage">Back to Payment Management</a>
        </body>
      </html>
    `);
  }
);

const failureController = catchAsyncP(async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  if (typeof transactionId !== "string") {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
  }

  // Assuming there's logic to handle failure (this needs to be implemented)
  res.send(`
      <html>
        <head>
          <title>Payment Failed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: red; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; text-decoration: none; color: white; background-color: #007bff; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Payment Failed</h1>
          <p>Unfortunately, your payment could not be processed. Please try again later.</p>
          <a href="https://techx-client.vercel.app">Back to Payment Management</a>
        </body>
      </html>
    `);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderService.getOrderById(orderId);

  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Order not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const updateData = req.body;
  const result = await OrderService.updateOrder(orderId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  await OrderService.deleteOrder(orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order deleted successfully",
    data: null,
  });
});

const getOrdersByUserEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await OrderService.getOrdersByUserEmail(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully by user email",
    data: result,
  });
});

const getOrdersByVendorEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await OrderService.getOrdersByVendorEmail(email);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Orders retrieved successfully by vendor email",
      data: result,
    });
  }
);

const getOrderProductsByUserEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await OrderService.getOrderProductByUserEmail(email);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order items retrieved successfully by user email",
      data: result,
    });
  }
);

const getOrderProductsByVendorEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await OrderService.getOrderProductByVendorEmail(email);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order items retrieved successfully by user email",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserEmail,
  getOrdersByVendorEmail,
  getOrderProductsByUserEmail,
  getOrderProductsByVendorEmail,
  confirmationController,
  failureController,
};
