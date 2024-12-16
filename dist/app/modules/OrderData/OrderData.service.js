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
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const payment_utils_1 = require("./payment.utils");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userEmail, vendorId, vendorEmail, shopName, totalItems, totalPrice, paymentMethod, status, orderItems, } = orderData;
    // payment option
    const generateTransactionId = () => {
        const timestamp = Date.now();
        const randomPart = Math.random().toString(36).substring(2, 15);
        return `${timestamp}-${randomPart}`;
    };
    const transactionId = generateTransactionId();
    // payment option
    const paymentData = {
        orderData,
        transactionId,
    };
    // Create the Order with OrderItems
    const result = yield prisma.order.create({
        data: {
            userId,
            userEmail,
            vendorId,
            vendorEmail,
            shopName,
            totalItems,
            totalPrice,
            paymentMethod: "Pending",
            status,
            transactionId,
            orderItems: {
                create: orderItems.map((item) => ({
                    productId: item.productId,
                    userEmail,
                    vendorEmail,
                    name: item.name,
                    requiredQty: item.requiredQty,
                    price: item.price,
                })),
            },
        },
        include: { orderItems: true },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create payment record.");
    }
    const user = yield prisma.user.findUnique({
        where: { userId },
    });
    const paymentSession = yield (0, payment_utils_1.initiatePayment)({
        transactionId,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        address: user === null || user === void 0 ? void 0 : user.address,
        totalPrice,
    });
    return paymentSession;
});
const confirmationService = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Verify payment using an external service
    const verifyResponse = yield (0, payment_utils_1.paymentVerify)(transactionId);
    console.log("verifyResponse", verifyResponse);
    console.log("verifyResponsePaymentType", verifyResponse.payment_type);
    // Step 2: Find the payment in the database using Prisma
    const payment = yield prisma.order.findUnique({
        where: { transactionId }, // Assuming 'transactionId' is unique
    });
    console.log("paymentInfo", payment);
    // Step 3: Handle case where payment is not found
    if (!payment) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Payment record not found");
    }
    yield prisma.order.update({
        where: { transactionId },
        data: { paymentMethod: verifyResponse.payment_type },
    });
    // Return the payment details if found
    return payment;
});
const getAllOrders = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    // Fetch the total count of orders
    const total = yield prisma.order.count({
        where: { status: { not: "Deleted" } },
    });
    // Fetch paginated orders with required relations
    const result = yield prisma.order.findMany({
        where: { status: { not: "Deleted" } },
        skip: offset,
        take: limit,
        include: {
            orderItems: true,
            user: true,
            vendor: true,
        },
    });
    return { result, total };
});
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.findUnique({
        where: { orderId },
        include: { orderItems: true, user: true, vendor: true },
    });
});
const updateOrder = (orderId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.update({
        where: { orderId },
        data: updateData,
    });
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.update({
        where: { orderId },
        data: { status: "Deleted" },
    });
});
const getOrdersByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.findMany({
        where: {
            user: {
                email, // Match user email
            },
        },
        include: {
            user: true, // Include user details
            vendor: true, // Include vendor details
            orderItems: true, // Include order items
        },
    });
});
const getOrdersByVendorEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.order.findMany({
        where: {
            vendor: {
                email, // Match vendor email
            },
        },
        include: {
            user: true, // Include user details
            vendor: true, // Include vendor details
            orderItems: true, // Include order items
        },
    });
});
const getOrderProductByUserEmail = (email, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const total = yield prisma.orderItem.count({
        where: { userEmail: email },
    });
    const result = yield prisma.orderItem.findMany({
        where: {
            userEmail: email, // Filter by userEmail
        },
        skip: offset,
        take: limit,
        include: {
            product: true,
        },
    });
    return { result, total };
});
const getOrderProductByVendorEmail = (email, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const total = yield prisma.orderItem.count({
        where: { vendorEmail: email },
    });
    const result = yield prisma.orderItem.findMany({
        where: {
            vendorEmail: email, // Filter by userEmail
        },
        skip: offset,
        take: limit,
        include: {
            product: true,
        },
    });
    return { result, total };
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByUserEmail,
    getOrdersByVendorEmail,
    getOrderProductByUserEmail,
    getOrderProductByVendorEmail,
    confirmationService,
};
