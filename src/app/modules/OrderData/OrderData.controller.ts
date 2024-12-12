import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { OrderService } from "./OrderData.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
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
};
