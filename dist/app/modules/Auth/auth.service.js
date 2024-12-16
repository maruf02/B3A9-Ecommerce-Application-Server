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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const emailSender_1 = __importDefault(require("./emailSender"));
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!userData) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Email not found");
        }
        if (userData.isBlock === "Yes") {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Your account is blocked");
        }
        if (userData.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.GONE, "Your account is deleted");
        }
        const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
        if (!isCorrectPassword) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Password incorrect");
        }
        const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
            userId: userData.userId,
            email: userData.email,
            role: userData.role,
        }, config_1.default.jwt_access_secret, "10d");
        const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
            email: userData.email,
            role: userData.role,
        }, config_1.default.jwt_refresh_secret, "365d");
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error.message || "An error occurred during login");
    }
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const isCorrectPassword = yield bcrypt.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Password incorrect!");
    }
    const hashedPassword = yield bcrypt.hash(payload.newPassword, 12);
    yield prisma.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: "Password changed successfully!",
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            // status: UserStatus.ACTIVE,
        },
    });
    const resetPassToken = jwtHelpers_1.jwtHelpers.generateToken({ email: userData.email, role: userData.role }, config_1.default.reset_pass_secret, config_1.default.reset_pass_token_expires_in);
    //console.log(resetPassToken)
    const resetPassLink = config_1.default.reset_pass_link +
        `?userId=${userData.userId}&token=${resetPassToken}`;
    yield (0, emailSender_1.default)(userData.email, `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `);
    //console.log(resetPassLink)
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, userId, password } = payload;
    console.log({ payload });
    // Verify the token
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.reset_pass_secret);
    if (!isValidToken) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Invalid or expired token!");
    }
    console.log("isValidToken", isValidToken);
    // Fetch the user using userId
    const userData = yield prisma.user.findUniqueOrThrow({
        where: { userId },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
    }
    console.log("userData", userData);
    // Hash the new password
    const hashedPassword = yield bcrypt.hash(password, 12);
    // Update the user's password in the database
    yield prisma.user.update({
        where: { userId },
        data: { password: hashedPassword },
    });
    console.log("Password successfully updated!");
});
exports.AuthServices = {
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
