import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createCategory = async (CategoryData: any) => {
  const { CategoryName } = CategoryData;

  // Create a new Category
  return await prisma.category.create({
    data: {
      CategoryName,
    },
  });
};

const getAllCategorys = async () => {
  const result = await prisma.category.findMany({
    where: { isDeleted: false },
  });
  return result;
};

const getCategoryById = async (CategoryId: string) => {
  const result = await prisma.category.findUnique({
    where: { CategoryId },
  });
  return result;
};

const updateCategory = async (CategoryId: string, updateData: any) => {
  const result = await prisma.category.update({
    where: { CategoryId },
    data: updateData,
  });
  return result;
};

const deleteCategory = async (CategoryId: string) => {
  const result = await prisma.category.update({
    where: { CategoryId },
    data: { isDeleted: true },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
