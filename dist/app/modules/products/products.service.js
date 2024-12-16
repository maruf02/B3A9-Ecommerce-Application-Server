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
exports.ProductService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createProduct = (user, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, category, description, quantity, mimage, image2, image3, image4, image5, discount, discountPrice, isFlashSale, } = productData;
    const { email } = user;
    const shop = yield prisma.shopName.findUnique({
        where: { email },
    });
    if (!shop) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Shop not found for the provided user");
    }
    // Get shopNameM from the shop entry
    const shopNameM = shop.shopName;
    // Create a new product
    return yield prisma.product.create({
        data: {
            shopNameM,
            email,
            name,
            price,
            category,
            description,
            quantity,
            mimage,
            image2,
            image3,
            image4,
            image5,
            discount,
            discountPrice,
            isFlashSale,
            vendorId: shop.vendorId,
        },
    });
});
const getAllProducts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const total = yield prisma.product.count({
        where: { isDeleted: false },
    });
    const products = yield prisma.product.findMany({
        where: { isDeleted: false },
        skip: offset,
        take: limit,
        include: { shopName: true },
    });
    return { products, total };
});
const getAllSProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany();
    return products;
});
const getAllProductsByVendorId = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.product.findMany({
        where: {
            isDeleted: false,
            vendorId: vendorId, // Filter by vendorId
        },
        include: {
            shopName: true, // Include related shopName data if needed
        },
    });
    return result;
});
const getAllProductsByVendorIdP = (vendorId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const total = yield prisma.product.count({
        where: { isDeleted: false, vendorId: vendorId },
    });
    const result = yield prisma.product.findMany({
        where: {
            isDeleted: false,
            vendorId: vendorId, // Filter by vendorId
        },
        skip: offset,
        take: limit,
        include: {
            shopName: true, // Include related shopName data if needed
        },
    });
    return { result, total };
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.product.findUnique({
        where: { productId },
        include: { shopName: true },
    });
    if (!result || result.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    return result;
});
const getProductsByCartIds = (productIds) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("productIds received by service:", productIds);
    const results = yield prisma.product.findMany({
        where: {
            productId: {
                in: productIds, // Match productId with the array of productIds
            },
            isDeleted: false, // Optional: Exclude deleted products
        },
        include: { shopName: true },
    });
    // Log the result to check what you get back
    console.log("Products found:", results);
    if (results.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Products not foundddddd");
    }
    return results;
});
const getProductByEmail = (email, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const total = yield prisma.product.count({
        where: { isDeleted: false },
    });
    const shop = yield prisma.shopName.findUnique({
        where: { email },
    });
    if (!shop) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Shop not found");
    }
    const result = yield prisma.product.findMany({
        where: {
            vendorId: shop.vendorId,
            isDeleted: false,
        },
        skip: offset,
        take: limit,
        include: { shopName: true },
    });
    return { result, total };
});
// const getProductByEmail = async (email: string) => {
//   const shop = await prisma.shopName.findUnique({
//     where: { email },
//   });
//   if (!shop) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Shop not found");
//   }
//   const result = await prisma.product.findMany({
//     where: {
//       vendorId: shop.vendorId,
//       isDeleted: false,
//     },
//   });
//   return result;
// };
const updateProduct = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: { productId },
    });
    if (!product || product.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    const result = yield prisma.product.update({
        where: { productId },
        data: updateData,
    });
    return result;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: { productId },
    });
    if (!product || product.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
    }
    yield prisma.product.update({
        where: { productId },
        data: { isDeleted: true },
    });
});
const getAllFlashSaleProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        where: {
            isFlashSale: "Yes",
        },
    });
    return products;
});
const getAllProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma.product.findMany({
        where: {
            isDeleted: false,
            category: category,
        },
        include: { shopName: true },
    });
    return products;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByEmail,
    updateProduct,
    deleteProduct,
    getAllProductsByVendorId,
    getProductsByCartIds,
    getAllSProducts,
    getAllProductsByVendorIdP,
    getAllFlashSaleProducts,
    getAllProductsByCategory,
};
