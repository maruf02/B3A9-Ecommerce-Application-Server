import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { CategoryService } from "./Category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body;
  const result = await CategoryService.createCategory(categoryData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategorys = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategorys();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categorys retrieved successfully",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await CategoryService.getCategoryById(categoryId);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Category not found",
      data: result,
    });

    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categorys retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const updateData = req.body;
  const result = await CategoryService.updateCategory(categoryId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  console.log(categoryId);
  await CategoryService.deleteCategory(categoryId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category successfully deleted",
    data: null,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategorys,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
