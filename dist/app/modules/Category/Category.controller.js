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
exports.CategoryController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const Category_service_1 = require("./Category.service");
const createCategory = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const result = yield Category_service_1.CategoryService.createCategory(categoryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Category created successfully",
        data: result,
    });
}));
const getAllCategorys = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_service_1.CategoryService.getAllCategorys();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Categorys retrieved successfully",
        data: result,
    });
}));
const getCategoryById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield Category_service_1.CategoryService.getCategoryById(categoryId);
    if (!result || result.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "Category not found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Categorys retrieved successfully",
        data: result,
    });
}));
const updateCategory = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const updateData = req.body;
    const result = yield Category_service_1.CategoryService.updateCategory(categoryId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category updated successfully",
        data: result,
    });
}));
const deleteCategory = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    console.log(categoryId);
    yield Category_service_1.CategoryService.deleteCategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Category successfully deleted",
        data: null,
    });
}));
exports.CategoryController = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
