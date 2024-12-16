"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Category_controller_1 = require("./Category.controller");
const router = (0, express_1.Router)();
router.post("/categories", (0, auth_1.default)(), Category_controller_1.CategoryController.createCategory);
router.get("/categories", Category_controller_1.CategoryController.getAllCategorys);
router.get("/categories/:categoryId", Category_controller_1.CategoryController.getCategoryById);
router.put("/categories/:categoryId", Category_controller_1.CategoryController.updateCategory);
router.delete("/categories/:categoryId", Category_controller_1.CategoryController.deleteCategory);
exports.categoriesRoutes = router;
