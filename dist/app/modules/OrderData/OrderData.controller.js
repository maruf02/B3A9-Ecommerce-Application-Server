"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const OrderData_service_1 = require("./OrderData.service");
const createOrder = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const result = yield OrderData_service_1.OrderService.createOrder(orderData);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Order created successfully",
        data: result,
    });
}));
const confirmationController = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the transactionId from query parameters
    const { transactionId } = req.query;
    // Ensure transactionId is a string, since query parameters are always strings by default
    // if (typeof transactionId !== "string") {
    //   return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
    // }
    if (typeof transactionId !== "string") {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
        return;
    }
    const result = yield OrderData_service_1.OrderService.confirmationService(transactionId);
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
          <a href="https://peracommerce.vercel.app/commentPage">Back to Payment Management</a>
        </body>
      </html>
    `);
}));
const failureController = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    // if (typeof transactionId !== "string") {
    //   return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
    // }
    if (typeof transactionId !== "string") {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
        return; // Explicit return to prevent further execution
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
          <a href="https://peracommerce.vercel.app/checkout">Back to Payment Management</a>
        </body>
      </html>
    `);
}));
const getAllOrders = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    // Call the service layer to fetch orders
    const result = yield OrderData_service_1.OrderService.getAllOrders(page, limit);
    if (!result || result.result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "No orders found",
            data: [],
        });
    }
    // Send successful response
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.result,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
const getOrderById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield OrderData_service_1.OrderService.getOrderById(orderId);
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Order not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Order retrieved successfully",
        data: result,
    });
}));
const updateOrder = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const updateData = req.body;
    const result = yield OrderData_service_1.OrderService.updateOrder(orderId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Order updated successfully",
        data: result,
    });
}));
const deleteOrder = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    yield OrderData_service_1.OrderService.deleteOrder(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Order deleted successfully",
        data: null,
    });
}));
const getOrdersByUserEmail = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield OrderData_service_1.OrderService.getOrdersByUserEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Orders retrieved successfully by user email",
        data: result,
    });
}));
const getOrdersByVendorEmail = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield OrderData_service_1.OrderService.getOrdersByVendorEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Orders retrieved successfully by vendor email",
        data: result,
    });
}));
const getOrderProductsByUserEmail = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { email } = req.params;
    const result = yield OrderData_service_1.OrderService.getOrderProductByUserEmail(email, page, limit);
    if (!result || result.result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this shop",
            data: result.result,
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.result,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
const getOrderProductsByVendorEmail = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { email } = req.params;
    const result = yield OrderData_service_1.OrderService.getOrderProductByVendorEmail(email, page, limit);
    if (!result || result.result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this shop",
            data: result.result,
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.result,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
exports.OrderController = {
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
