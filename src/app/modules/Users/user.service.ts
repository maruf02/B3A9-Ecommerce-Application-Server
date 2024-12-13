import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createUser = async (userData: any) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        "Email is already taken. Please use a different email."
      );
    }

    const hashedPassword: string = await bcrypt.hash(userData.password, 12);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        StatusCodes.NOT_ACCEPTABLE,
        "Email is already taken. Please use a different email."
      );
    }

    throw new AppError(
      StatusCodes.BAD_GATEWAY,
      error.message || "An unexpected error occurred while creating the user."
    );
  }
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    where: { isDeleted: false },
  });
};

const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { userId },
  });
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const updateUser = async (userId: string, updateData: any) => {
  return await prisma.user.update({
    where: { userId },
    data: updateData,
  });
};

const deleteUser = async (userId: string) => {
  return await prisma.user.update({
    where: { userId },
    data: { isDeleted: true },
  });
};
const followShop = async (userId: string, vendorId: string) => {
  return await prisma.user.update({
    where: { userId },
    data: { isDeleted: true },
  });
};

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  followShop,
};
