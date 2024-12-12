import { PrismaClient } from "@prisma/client";

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
    transactionId,
    orderItems,
  } = orderData;

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
      paymentMethod,
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

  return result;
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

const getOrderProductByUserEmail = async (email: string) => {
  return await prisma.orderItem.findMany({
    where: {
      userEmail: email, // Filter by userEmail
    },
    include: {
      product: true,
    },
  });
};

const getOrderProductByVendorEmail = async (email: string) => {
  return await prisma.orderItem.findMany({
    where: {
      vendorEmail: email, // Filter by userEmail
    },
    include: {
      product: true,
    },
  });
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
};
