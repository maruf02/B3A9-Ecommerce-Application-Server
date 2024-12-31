import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import router from "./app/routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/globalErrorHandler";
import { userRoutes } from "./app/modules/Users/user.route";
import { AuthRoutes } from "./app/modules/Auth/auth.route";
import { VendorRoutes } from "./app/modules/Vendor/vendor.route";
import { ProductRoutes } from "./app/modules/products/products.route";
import { categoriesRoutes } from "./app/modules/Category/Category.route";
import { loginActivityRoutes } from "./app/modules/loginActivity/loginActivity.route";
import { orderRoutes } from "./app/modules/OrderData/OrderData.route";
import { commentRoutes } from "./app/modules/Comment/Comment.route";
import { replyCommentRoutes } from "./app/modules/ReplyComment/ReplyComment.route";
import { followShopRoutes } from "./app/modules/FollowShop/FollowShop.route";
import { couponRoutes } from "./app/modules/Coupon/Coupon.route";
import { EmailRoutes } from "./app/modules/Email/Email.route";
// import { bookRoutes } from "./app/modules/Books/books.route";
// import { memberRoutes } from "./app/modules/members/members.route";
// import { borrowReturnRoutes } from "./app/modules/BRBooks/BRBooks.route";

// import globalErrorHandler from "./app/globalErrorHandler";

const app: Application = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://peracommerce.vercel.app",
      "*",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all apis
app.use("/api", AuthRoutes);
app.use("/api", userRoutes);
app.use("/api", VendorRoutes);
app.use("/api", ProductRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", loginActivityRoutes);
app.use("/api", orderRoutes);
app.use("/api", commentRoutes);
app.use("/api", replyCommentRoutes);
app.use("/api", followShopRoutes);
app.use("/api", couponRoutes);
app.use("/api", EmailRoutes);

// app.use("/api", borrowReturnRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Peracommerce server is running..",
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
