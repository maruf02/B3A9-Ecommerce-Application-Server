import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/auth/signin", AuthController.loginUser);
router.post("/change-password", auth(), AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);

router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
