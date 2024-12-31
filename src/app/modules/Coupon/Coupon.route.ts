import { Router } from "express";
import auth from "../../middlewares/auth";
import { CouponController } from "./Coupon.controller";

const router = Router();

router.post("/coupon", auth(), CouponController.createCoupon);
router.get("/coupon", CouponController.getAllCoupons);
router.get("/coupon/:couponId", CouponController.getCouponById);
router.get("/coupons/vendor/:vendorId", CouponController.getCouponByVendorId);
router.put("/coupon/:couponId", CouponController.updateCoupon);
router.delete("/coupon/:couponId", CouponController.deleteCoupon);

export const couponRoutes = router;
