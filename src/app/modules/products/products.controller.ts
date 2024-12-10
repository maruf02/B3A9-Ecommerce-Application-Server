import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { ProductService } from "./products.service";

const createProduct = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const ProductData = req.body;
    const user = req.user;
    console.log(ProductData);
    const result = await ProductService.createProduct(user, ProductData);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  }
);

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { ProductId } = req.params;
  const result = await ProductService.getProductById(ProductId);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Product not found",
      data: result,
    });

    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getProductByShopName = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await ProductService.getProductByEmail(email);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Product not found",
      data: result,
    });
    return;
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { ProductId } = req.params;
  const updateData = req.body;
  const result = await ProductService.updateProduct(ProductId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { ProductId } = req.params;
  await ProductService.deleteProduct(ProductId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Product successfully deleted",
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByShopName,
  updateProduct,
  deleteProduct,
};
