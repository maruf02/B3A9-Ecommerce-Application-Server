import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/auth/signin", AuthController.loginUser);
router.post("/change-password", auth(), AuthController.changePassword);

export const AuthRoutes = router;
