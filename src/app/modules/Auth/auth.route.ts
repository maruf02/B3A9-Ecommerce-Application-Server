import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/change-password", auth(), AuthController.changePassword);
router.post(
  "/change-password",
  auth(Role.VENDOR),
  AuthController.changePassword
);

export const AuthRoutes = router;
