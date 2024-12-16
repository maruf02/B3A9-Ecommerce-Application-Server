"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import router from "./app/routes";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/globalErrorHandler"));
const user_route_1 = require("./app/modules/Users/user.route");
const auth_route_1 = require("./app/modules/Auth/auth.route");
const vendor_route_1 = require("./app/modules/Vendor/vendor.route");
const products_route_1 = require("./app/modules/products/products.route");
const Category_route_1 = require("./app/modules/Category/Category.route");
const loginActivity_route_1 = require("./app/modules/loginActivity/loginActivity.route");
const OrderData_route_1 = require("./app/modules/OrderData/OrderData.route");
const Comment_route_1 = require("./app/modules/Comment/Comment.route");
const ReplyComment_route_1 = require("./app/modules/ReplyComment/ReplyComment.route");
const FollowShop_route_1 = require("./app/modules/FollowShop/FollowShop.route");
// import { bookRoutes } from "./app/modules/Books/books.route";
// import { memberRoutes } from "./app/modules/members/members.route";
// import { borrowReturnRoutes } from "./app/modules/BRBooks/BRBooks.route";
// import globalErrorHandler from "./app/globalErrorHandler";
const app = (0, express_1.default)();
// app.use(cors());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://b3-a9-peracommerce-client.vercel.app",
        "*",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// all apis
app.use("/api", auth_route_1.AuthRoutes);
app.use("/api", user_route_1.userRoutes);
app.use("/api", vendor_route_1.VendorRoutes);
app.use("/api", products_route_1.ProductRoutes);
app.use("/api", Category_route_1.categoriesRoutes);
app.use("/api", loginActivity_route_1.loginActivityRoutes);
app.use("/api", OrderData_route_1.orderRoutes);
app.use("/api", Comment_route_1.commentRoutes);
app.use("/api", ReplyComment_route_1.replyCommentRoutes);
app.use("/api", FollowShop_route_1.followShopRoutes);
// app.use("/api", borrowReturnRoutes);
app.get("/", (req, res) => {
    res.send({
        Message: "Peracommerce server is running..",
    });
});
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(400).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
exports.default = app;
