"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginActivityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const loginActivity_controller_1 = require("./loginActivity.controller");
const router = express_1.default.Router();
router.post("/loginActivity", loginActivity_controller_1.LoginActivityController.createLoginActivity);
router.get("/loginActivities", loginActivity_controller_1.LoginActivityController.getAllLoginActivities);
exports.loginActivityRoutes = router;
