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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowShopService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createFollowShop = (followShopData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, vendorId } = followShopData;
    // Check if the followShop entry already exists
    // Create a new Category
    return yield prisma.followShop.create({
        data: {
            userId,
            vendorId,
        },
    });
});
const getAllFollowShops = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.followShop.findMany({
        where: { isDeleted: false },
        include: {
            user: true,
            vendor: true,
        },
    });
});
const getFollowShopsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.followShop.findMany({
        where: { userId, isDeleted: false },
        include: { vendor: true },
    });
});
const getFollowShopsByVendorId = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.followShop.findMany({
        where: { vendorId, isDeleted: false },
        include: { user: true },
    });
});
// const deleteFollowShopsByUserId = async (userId: string) => {
//   return await prisma.followShop.updateMany({
//     where: { userId, isDeleted: false },
//     data: { isDeleted: true },
//   });
// };
const deleteFollowShopByUserAndVendor = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find follow shop record that matches userId, vendorId, and is not deleted
    const followShop = yield prisma.followShop.findFirst({
        where: { userId, vendorId },
    });
    // If no matching record is found, return null (this will be checked in controller)
    if (!followShop) {
        return null;
    }
    // Permanently delete the record where userId and vendorId match
    yield prisma.followShop.deleteMany({
        where: { userId, vendorId },
    });
    return followShop; // Optionally return the deleted record
});
const getFollowStatusByUserAndVendor = (userId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find follow shop record that matches userId and vendorId
    const followShop = yield prisma.followShop.findFirst({
        where: { userId, vendorId },
    });
    // If no matching record found, return null
    return followShop;
});
exports.FollowShopService = {
    createFollowShop,
    getAllFollowShops,
    getFollowShopsByUserId,
    getFollowShopsByVendorId,
    //   deleteFollowShopsByUserId,
    deleteFollowShopByUserAndVendor,
    getFollowStatusByUserAndVendor,
};
