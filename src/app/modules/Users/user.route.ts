import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.put("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

export const userRoutes = router;
