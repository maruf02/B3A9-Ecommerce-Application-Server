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
exports.LoginActivityController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const loginActivity_service_1 = require("./loginActivity.service");
const createLoginActivity = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield loginActivity_service_1.loginActivityServices.createLoginActivity(req.body);
        console.log(result);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "Login activity created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error.message === "Invalid data") {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                success: false,
                message: "Invalid login activity data",
                data: null,
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                success: false,
                message: "Failed to create login activity",
                data: null,
            });
        }
    }
}));
const getAllLoginActivities = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield loginActivity_service_1.loginActivityServices.getAllLoginActivities();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Login activities fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to fetch login activities",
            data: null,
        });
    }
}));
exports.LoginActivityController = {
    createLoginActivity,
    getAllLoginActivities,
};
