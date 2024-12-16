"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followShopRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const FollowShop_controller_1 = require("./FollowShop.controller");
const router = (0, express_1.Router)();
router.post("/followShop", FollowShop_controller_1.FollowShopController.createFollowShop);
router.get("/followShop", FollowShop_controller_1.FollowShopController.getAllFollowShops);
router.get("/followShop/user/:userId", FollowShop_controller_1.FollowShopController.getFollowShopsByUserId);
router.get("/followShop/vendor/:vendorId", FollowShop_controller_1.FollowShopController.getFollowShopsByVendorId);
router.get("/followShopStatus/:vendorId", (0, auth_1.default)(), FollowShop_controller_1.FollowShopController.getFollowStatus);
// router.delete(
//   "/followShop/user/:userId",
//   FollowShopController.deleteFollowShopsByUserId
// );
router.delete("/followShop/user/:userId/vendor/:vendorId", FollowShop_controller_1.FollowShopController.deleteFollowShopByUserAndVendor);
exports.followShopRoutes = router;
