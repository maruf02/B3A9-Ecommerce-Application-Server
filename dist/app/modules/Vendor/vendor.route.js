"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const vendor_controller_1 = require("./vendor.controller");
const router = (0, express_1.Router)();
router.post("/vendors", (0, auth_1.default)(client_1.Role.VENDOR), vendor_controller_1.VendorController.createVendor);
router.get("/vendors", vendor_controller_1.VendorController.getAllVendors);
router.get("/vendors/:vendorId", vendor_controller_1.VendorController.getVendorById);
router.get("/vendors/email/:email", vendor_controller_1.VendorController.getVendorByEmail);
router.put("/vendors/:vendorId", vendor_controller_1.VendorController.updateVendor);
router.delete("/vendors/:vendorId", vendor_controller_1.VendorController.deleteVendor);
exports.VendorRoutes = router;
