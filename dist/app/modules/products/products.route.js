"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const products_controller_1 = require("./products.controller");
const router = (0, express_1.Router)();
router.post("/products", (0, auth_1.default)(), products_controller_1.ProductController.createProduct);
router.get("/products", products_controller_1.ProductController.getAllProducts);
router.get("/FlashSaleProducts", products_controller_1.ProductController.getAllFlashSaleProducts);
router.get("/productsS", products_controller_1.ProductController.getAllSProducts);
router.get("/productsGetByCategory/:category", products_controller_1.ProductController.getAllProductsByCategory);
router.get("/products/:ProductId", products_controller_1.ProductController.getProductById);
router.get("/productsByShopName/email/:email", products_controller_1.ProductController.getProductByShopName);
router.get("/productsByShopName/:vendorId", products_controller_1.ProductController.getAllProductsByVendorId);
router.get("/productsByShopNameP/:vendorId", products_controller_1.ProductController.getAllProductsByVendorIdP);
router.get("/cartProducts/cartItem", products_controller_1.ProductController.getProductsByCartIds);
router.put("/products/:productId", products_controller_1.ProductController.updateProduct);
router.delete("/products/:productId", products_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
