import { Router } from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./OrderData.controller";

const router = Router();

router.post("/orders", auth(), OrderController.createOrder);
router.get("/orders", OrderController.getAllOrders);
router.get("/orders/:orderId", OrderController.getOrderById);
router.get("/ordersByUserEmail/:email", OrderController.getOrdersByUserEmail);
router.get(
  "/ordersByVendorEmail/:email",
  OrderController.getOrdersByVendorEmail
);
router.get(
  "/ordersProductByUserEmail/:email",
  OrderController.getOrderProductsByUserEmail
);
router.get(
  "/ordersProductByVendorEmail/:email",
  OrderController.getOrderProductsByVendorEmail
);
router.put("/orders/:orderId", OrderController.updateOrder);
router.delete("/orders/:orderId", OrderController.deleteOrder);

export const orderRoutes = router;
