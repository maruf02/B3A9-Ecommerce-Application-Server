import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { ProductController } from "./products.controller";

const router = Router();

router.post("/products", auth(), ProductController.createProduct);
router.get("/products", ProductController.getAllProducts);
router.get("/products/:ProductId", ProductController.getProductById);
router.get(
  "/productsByShopName/email/:email",
  ProductController.getProductByShopName
);
router.put("/products/:productId", ProductController.updateProduct);
router.delete("/products/:productId", ProductController.deleteProduct);

export const ProductRoutes = router;
