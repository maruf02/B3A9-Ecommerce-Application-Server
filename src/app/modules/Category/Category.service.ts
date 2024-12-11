import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import AppError from "../../helpers/AppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createCategory = async (categoryData: any) => {
  const { categoryName, categoryImage } = categoryData;

  // Create a new Category
  return await prisma.category.create({
    data: {
      categoryName,
      categoryImage,
    },
  });
};

const getAllCategorys = async () => {
  const result = await prisma.category.findMany({
    where: { isDeleted: false },
  });
  return result;
};

const getCategoryById = async (categoryId: string) => {
  const result = await prisma.category.findUnique({
    where: { categoryId },
  });
  return result;
};

const updateCategory = async (categoryId: string, updateData: any) => {
  const result = await prisma.category.update({
    where: { categoryId },
    data: updateData,
  });
  return result;
};

const deleteCategory = async (categoryId: string) => {
  const result = await prisma.category.update({
    where: { categoryId },
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
