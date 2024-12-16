"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/auth/signup", user_controller_1.userController.createUser);
router.get("/users", (0, auth_1.default)(), user_controller_1.userController.getAllUsers);
router.get("/users/:userId", user_controller_1.userController.getUserById);
router.get("/users/email/:email", user_controller_1.userController.getUserByEmail);
router.put("/users/:userId", user_controller_1.userController.updateUser);
router.delete("/users/:userId", user_controller_1.userController.deleteUser);
exports.userRoutes = router;
