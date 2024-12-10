import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { VendorController } from "./vendor.controller";

const router = Router();

router.post("/vendors", auth(Role.ADMIN), VendorController.createVendor);
router.get("/vendors", VendorController.getAllVendors);
router.get("/vendors/:vendorId", VendorController.getVendorById);
router.get("/vendors/email/:email", VendorController.getVendorByEmail);
router.put("/vendors/:vendorId", VendorController.updateVendor);
router.delete("/vendors/:vendorId", VendorController.deleteVendor);

export const VendorRoutes = router;
