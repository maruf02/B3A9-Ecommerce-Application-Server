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
exports.FollowShopController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const FollowShop_service_1 = require("./FollowShop.service");
const createFollowShop = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followShopData = req.body;
    console.log("followShopData", followShopData);
    const result = yield FollowShop_service_1.FollowShopService.createFollowShop(followShopData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "FollowShop created successfully",
        data: result,
    });
}));
const getAllFollowShops = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FollowShop_service_1.FollowShopService.getAllFollowShops();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "FollowShops retrieved successfully",
        data: result,
    });
}));
const getFollowShopsByUserId = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield FollowShop_service_1.FollowShopService.getFollowShopsByUserId(userId);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: "You don't follow this vendor",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "FollowShops by user retrieved successfully",
        data: result,
    });
}));
const getFollowShopsByVendorId = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vendorId } = req.params;
    const result = yield FollowShop_service_1.FollowShopService.getFollowShopsByVendorId(vendorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "FollowShops by vendor retrieved successfully",
        data: result,
    });
}));
// const deleteFollowShopsByUserId = catchAsync(
//   async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     await FollowShopService.deleteFollowShopsByUserId(userId);
//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: "FollowShops by user deleted successfully",
//       data: null,
//     });
//   }
// );
const deleteFollowShopByUserAndVendor = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, vendorId } = req.params;
    // Call service to delete follow shop
    const followShop = yield FollowShop_service_1.FollowShopService.deleteFollowShopByUserAndVendor(userId, vendorId);
    // If no follow shop is found, return an error message
    if (!followShop) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: "You don't follow this vendor",
            data: null,
        });
    }
    // Return success response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "FollowShop by user and vendor deleted successfully",
        data: null,
    });
}));
const getFollowStatus = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { vendorId } = req.params;
    console.log("object", req.params, userId);
    // Call service to check follow status
    const followShop = yield FollowShop_service_1.FollowShopService.getFollowStatusByUserAndVendor(userId, vendorId);
    console.log("followShop", followShop);
    const followId = followShop === null || followShop === void 0 ? void 0 : followShop.followId;
    const isDeleted = followShop === null || followShop === void 0 ? void 0 : followShop.isDeleted;
    // If no follow shop record found
    if (followId && !isDeleted) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: "NeedUnFollow",
            data: null,
        });
    }
    else {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "NeedFollow",
            data: null,
        });
    }
    // Check if follow shop exists and is not deleted (followed)
    // Check if follow shop exists and is deleted (unfollowed)
}));
exports.FollowShopController = {
    createFollowShop,
    getAllFollowShops,
    getFollowShopsByUserId,
    getFollowShopsByVendorId,
    //   deleteFollowShopsByUserId,
    deleteFollowShopByUserAndVendor,
    getFollowStatus,
};
