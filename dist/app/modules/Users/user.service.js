"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "Email is already taken. Please use a different email.");
        }
        const hashedPassword = yield bcrypt.hash(userData.password, 12);
        const newUser = yield prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword }),
        });
        return newUser;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "Email is already taken. Please use a different email.");
        }
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, error.message || "An unexpected error occurred while creating the user.");
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        where: { isDeleted: false },
    });
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { userId },
    });
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: { email },
    });
});
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { userId },
        data: updateData,
    });
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { userId },
        data: { isDeleted: true },
    });
});
const followShop = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { userId },
        data: { isDeleted: true },
    });
});
exports.userService = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    followShop,
};
