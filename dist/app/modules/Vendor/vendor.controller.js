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
exports.VendorController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const vendor_service_1 = require("./vendor.service");
const createVendor = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const VendorData = req.body;
    const user = req.user;
    console.log(VendorData);
    const result = yield vendor_service_1.VendorService.createVendor(user, VendorData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Vendor created successfully",
        data: result,
    });
}));
const getAllVendors = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.VendorService.getAllVendors();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vendors retrieved successfully",
        data: result,
    });
}));
const getVendorById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const result = yield vendor_service_1.VendorService.getVendorById(vendorId);
    if (!result || result.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "Vendor not found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vendors retrieved successfully",
        data: result,
    });
}));
const getVendorByEmail = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield vendor_service_1.VendorService.getVendorByEmail(email);
    if (!result || result.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: true,
            message: "Vendor not found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vendors retrieved successfully",
        data: result,
    });
}));
const updateVendor = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const updateData = req.body;
    const result = yield vendor_service_1.VendorService.updateVendor(vendorId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vendor updated successfully",
        data: result,
    });
}));
const deleteVendor = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { VendorId } = req.params;
    yield vendor_service_1.VendorService.deleteVendor(VendorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vendor successfully deleted",
        data: null,
    });
}));
exports.VendorController = {
    createVendor,
    getAllVendors,
    getVendorById,
    getVendorByEmail,
    updateVendor,
    deleteVendor,
};
