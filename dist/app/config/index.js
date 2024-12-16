"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    reset_pass_secret: process.env.RESET_PASS_SECREATE,
    reset_pass_token_expires_in: process.env.RESET_PASS_EXPIRE_IN,
    reset_pass_link: process.env.RESET_PAS_LINK,
    emailSender: {
        email: process.env.EMAIL_SENDER_EMAIL,
        app_pass: process.env.EMAIL_SENDER_APP_PASS,
    },
};
