"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const loginUser = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthServices.loginUser(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: false, // Set to `true` in production with HTTPS
            httpOnly: true,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Logged in successfully!",
            data: {
                accessToken: result.accessToken,
            },
        });
    }
    catch (error) {
        if (error.message === "Email not found") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                success: true,
                message: "Email incorrect",
                data: null,
            });
        }
        else if (error.message === "Password incorrect") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                success: true,
                message: "Password not match",
                data: null,
            });
        }
        else if (error.message === "Your account is blocked") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                success: true,
                message: "Your account is blocked",
                data: null,
            });
        }
        else if (error.message === "Your account is deleted") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                success: true,
                message: "Your account is deleted",
                data: null,
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                success: true,
                message: "Internal server error",
                data: null,
            });
        }
    }
}));
const changePassword = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        const result = yield auth_service_1.AuthServices.changePassword(user, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Password Changed successfully",
            data: result,
        });
    }
    catch (err) {
        if (err.message === "Password incorrect!") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                success: true,
                message: "Password not match",
                data: null,
            });
        }
    }
}));
const forgotPassword = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.AuthServices.forgotPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Check your email!",
        data: null,
    });
}));
const resetPassword = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { password } = req.body;
    // const { token, userId } = req.query;
    // uporer gula postman er jonno
    const { token, userId, password } = req.body;
    console.log(token, userId, password);
    console.log("userId", password);
    if (!userId || !token || !password) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields!");
    }
    yield auth_service_1.AuthServices.resetPassword({
        token,
        userId: userId, // Cast userId to string
        password,
    });
    // const token = req.headers.authorization || "";
    // await AuthServices.resetPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Password Reset!",
        data: null,
    });
}));
exports.AuthController = {
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
