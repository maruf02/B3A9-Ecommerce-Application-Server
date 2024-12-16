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
exports.VendorService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createVendor = (user, vendorData) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName } = vendorData;
    const { email, userId } = user;
    // Check if email already exists
    const existingVendor = yield prisma.shopName.findUnique({
        where: { email },
    });
    if (existingVendor) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Brand already register in this email");
    }
    // Create a new vendor
    return yield prisma.shopName.create({
        data: {
            shopName,
            email,
            userId,
        },
    });
});
const getAllVendors = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.shopName.findMany({
        where: { isDeleted: false },
        include: { user: true },
    });
    return result;
});
const getVendorById = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.shopName.findUnique({
        where: { vendorId },
        include: { user: true },
    });
    return result;
});
const getVendorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.shopName.findUnique({
        where: { email },
        include: { user: true },
    });
    return result;
});
const updateVendor = (vendorId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.shopName.update({
        where: { vendorId },
        data: updateData,
    });
    return result;
});
const deleteVendor = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.shopName.update({
        where: { vendorId },
        data: { isDeleted: true },
    });
    return result;
});
exports.VendorService = {
    createVendor,
    getAllVendors,
    getVendorById,
    getVendorByEmail,
    updateVendor,
    deleteVendor,
};
