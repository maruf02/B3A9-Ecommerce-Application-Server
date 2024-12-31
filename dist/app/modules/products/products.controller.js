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
exports.ProductController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const products_service_1 = require("./products.service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductData = req.body;
    const user = req.user;
    console.log(user);
    const result = yield products_service_1.ProductService.createProduct(user, ProductData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Product created successfully",
        data: result,
    });
}));
const getAllProducts = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = yield products_service_1.ProductService.getAllProducts(page, limit);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.products,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
const getAllSProducts = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.ProductService.getAllSProducts();
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this shop",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const getAllProductsByVendorId = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params; // Use vendorId from route params
    const result = yield products_service_1.ProductService.getAllProductsByVendorId(vendorId);
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this shop",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const getAllProductsByVendorIdP = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { vendorId } = req.params; // Use vendorId from route params
    const result = yield products_service_1.ProductService.getAllProductsByVendorIdP(vendorId, page, limit);
    if (!result || result.result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this shop",
            data: result.result,
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.result,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
const getProductById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ProductId } = req.params;
    const result = yield products_service_1.ProductService.getProductById(ProductId);
    if (!result || result.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "Product not found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const getProductsByCartIds = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds } = req.query;
    if (!productIds || typeof productIds !== "string") {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
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
        const result = yield products_service_1.ProductService.getProductsByCartIds(productIdsArray);
        if (result.length === 0) {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                success: true,
                message: "No products foundddd",
                data: result,
            });
            return;
        }
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Products retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
const getProductByShopName = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { email } = req.params;
    const result = yield products_service_1.ProductService.getProductByEmail(email, page, limit);
    // if (!result || result.isDeleted) {
    if (!result) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "Product not found",
            data: result,
        });
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.result,
        meta: {
            total: result.total,
            page,
            limit,
        },
    });
}));
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
const updateProduct = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updateData = req.body;
    console.log(productId, updateData);
    const result = yield products_service_1.ProductService.updateProduct(productId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    yield products_service_1.ProductService.deleteProduct(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Product successfully deleted",
        data: null,
    });
}));
const getAllFlashSaleProducts = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.ProductService.getAllFlashSaleProducts();
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No flash sale products found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Flash sale products retrieved successfully",
        data: result,
    });
}));
const getAllProductsByCategory = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params; // Use category from route params
    const result = yield products_service_1.ProductService.getAllProductsByCategory(category);
    if (!result || result.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "No products found for this category",
            data: result,
        });
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: `Products retrieved for category: ${category}`,
        data: result,
    });
}));
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByShopName,
    updateProduct,
    deleteProduct,
    getAllProductsByVendorId,
    getProductsByCartIds,
    getAllSProducts,
    getAllProductsByVendorIdP,
    getAllFlashSaleProducts,
    getAllProductsByCategory,
};
