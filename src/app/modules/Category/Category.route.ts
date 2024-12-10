import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { CategoryController } from "./Category.controller";

const router = Router();

router.post("/categories", auth(), CategoryController.createCategory);
router.get("/categories", CategoryController.getAllCategorys);
router.get("/categories/:categoryId", CategoryController.getCategoryById);
router.put("/categories/:categoryId", CategoryController.updateCategory);
router.delete("/categories/:categoryId", CategoryController.deleteCategory);

export const categoriesRoutes = router;
