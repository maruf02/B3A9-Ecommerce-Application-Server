import { Router } from "express";
import auth from "../../middlewares/auth";
import { FollowShopController } from "./FollowShop.controller";

const router = Router();

router.post("/followShop", FollowShopController.createFollowShop);
router.get("/followShop", FollowShopController.getAllFollowShops);
router.get(
  "/followShop/user/:userId",

  FollowShopController.getFollowShopsByUserId
);
router.get(
  "/followShop/vendor/:vendorId",

  FollowShopController.getFollowShopsByVendorId
);
router.get(
  "/followShopStatus/:vendorId",
  auth(),
  FollowShopController.getFollowStatus
);
// router.delete(
//   "/followShop/user/:userId",

//   FollowShopController.deleteFollowShopsByUserId
// );
router.delete(
  "/followShop/user/:userId/vendor/:vendorId",
  FollowShopController.deleteFollowShopByUserAndVendor
);

export const followShopRoutes = router;
