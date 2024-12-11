import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { ProductService } from "./products.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  const result = await ProductService.getAllProducts(page, limit);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Products retrieved successfully",
    data: result.products,
    meta: {
      total: result.total,
      page,
      limit,
    },
  });
});

const getAllProductsByVendorId = catchAsync(
  async (req: Request, res: Response) => {
    const { vendorId } = req.params; // Use vendorId from route params
    const result = await ProductService.getAllProductsByVendorId(vendorId);

    if (!result || result.length === 0) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: true,
        message: "No products found for this shop",
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
  }
);

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

const getProductsByCartIds = catchAsync(async (req: Request, res: Response) => {
  const { productIds } = req.query;

  if (!productIds || typeof productIds !== "string") {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Product IDs are required and must be a string",
      data: null,
    });
    return;
  }

  // Split the string by commas to get an array of product IDs
  const productIdsArray = productIds.split(",");

  console.log("Received productIds:", productIdsArray); // Debugging line

  try {
    const result = await ProductService.getProductsByCartIds(productIdsArray);

    if (result.length === 0) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: true,
        message: "No products foundddd",
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
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const getProductByShopName = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const { email } = req.params;
  const result = await ProductService.getProductByEmail(email, page, limit);
  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: true,
      message: "Product not found",
      data: result,
    });
    return;
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Products retrieved successfully",
    data: result,
    meta: {
      total: result.total,
      page,
      limit,
    },
  });
});
// const getProductByShopName = catchAsync(async (req: Request, res: Response) => {
//   const { email } = req.params;
//   const result = await ProductService.getProductByEmail(email);
//   if (!result || result.isDeleted) {
//     sendResponse(res, {
//       statusCode: StatusCodes.NOT_FOUND,
//       success: true,
//       message: "Product not found",
//       data: result,
//     });
//     return;
//   }
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Products retrieved successfully",
//     data: result,
//   });
// });

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateData = req.body;
  console.log(productId, updateData);
  const result = await ProductService.updateProduct(productId, updateData);

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
  getAllProductsByVendorId,
  getProductsByCartIds,
};
