import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (userData: any) => {
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("Email is already taken. Please use a different email.");
    }

    // Hash the password before saving
    const hashedPassword: string = await bcrypt.hash(userData.password, 12);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword, // Store the hashed password
      },
    });

    return newUser;
  } catch (error: any) {
    // Handle Prisma unique constraint error for duplicate email
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Email is already taken. Please use a different email.");
    }

    throw new Error(
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

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
