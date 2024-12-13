import { PrismaClient } from "@prisma/client";
import { initiatePayment, paymentVerify } from "./payment.utils";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createOrder = async (orderData: any) => {
  const {
    userId,
    userEmail,
    vendorId,
    vendorEmail,
    shopName,
    totalItems,
    totalPrice,
    paymentMethod,
    status,
    orderItems,
  } = orderData;

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
  const result = await prisma.order.create({
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
        create: orderItems.map((item: any) => ({
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
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create payment record."
    );
  }

  const user = await prisma.user.findUnique({
    where: { userId },
  });
  const paymentSession = await initiatePayment({
    transactionId,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    totalPrice,
  });

  return paymentSession;
};

const confirmationService = async (transactionId: string) => {
  // Step 1: Verify payment using an external service
  const verifyResponse = await paymentVerify(transactionId);
  console.log("verifyResponse", verifyResponse);
  console.log("verifyResponsePaymentType", verifyResponse.payment_type);

  // Step 2: Find the payment in the database using Prisma
  const payment = await prisma.order.findUnique({
    where: { transactionId }, // Assuming 'transactionId' is unique
  });

  console.log("paymentInfo", payment);
  // Step 3: Handle case where payment is not found
  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Payment record not found");
  }
  await prisma.order.update({
    where: { transactionId },
    data: { paymentMethod: verifyResponse.payment_type },
  });

  // Return the payment details if found
  return payment;
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    where: { status: { not: "Deleted" } },
    include: { orderItems: true, user: true, vendor: true },
  });
};

const getOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { orderId },
    include: { orderItems: true, user: true, vendor: true },
  });
};

const updateOrder = async (orderId: string, updateData: any) => {
  return await prisma.order.update({
    where: { orderId },
    data: updateData,
  });
};

const deleteOrder = async (orderId: string) => {
  return await prisma.order.update({
    where: { orderId },
    data: { status: "Deleted" },
  });
};

const getOrdersByUserEmail = async (email: string) => {
  return await prisma.order.findMany({
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
};

const getOrdersByVendorEmail = async (email: string) => {
  return await prisma.order.findMany({
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
};

const getOrderProductByUserEmail = async (
  email: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const total = await prisma.orderItem.count({
    where: { userEmail: email },
  });
  const result = await prisma.orderItem.findMany({
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
};

const getOrderProductByVendorEmail = async (
  email: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const total = await prisma.orderItem.count({
    where: { vendorEmail: email },
  });
  const result = await prisma.orderItem.findMany({
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
};

export const OrderService = {
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
