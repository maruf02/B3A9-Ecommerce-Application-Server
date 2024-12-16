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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryImage } = categoryData;
    // Create a new Category
    return yield prisma.category.create({
        data: {
            categoryName,
            categoryImage,
        },
    });
});
const getAllCategorys = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findMany({
        where: { isDeleted: false },
    });
    return result;
});
const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findUnique({
        where: { categoryId },
    });
    return result;
});
const updateCategory = (categoryId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.update({
        where: { categoryId },
        data: updateData,
    });
    return result;
});
const deleteCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.update({
        where: { categoryId },
        data: { isDeleted: true },
    });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
