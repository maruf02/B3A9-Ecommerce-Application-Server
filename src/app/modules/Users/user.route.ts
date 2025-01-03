import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/auth/signup", userController.createUser);
router.get("/users", auth(), userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.put("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

export const userRoutes = router;
