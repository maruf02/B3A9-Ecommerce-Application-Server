"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const Comment_controller_1 = require("./Comment.controller");
const router = (0, express_1.Router)();
// Routes for comments
router.post("/comments", (0, auth_1.default)(), Comment_controller_1.CommentController.createComment);
router.get("/comments", Comment_controller_1.CommentController.getAllComments);
router.get("/comments/:commentId", Comment_controller_1.CommentController.getCommentById);
router.get("/commentsGetByProductId/:productId", Comment_controller_1.CommentController.getCommentsByProductId);
router.put("/comments/:commentId", (0, auth_1.default)(), Comment_controller_1.CommentController.updateComment);
router.delete("/comments/:commentId", (0, auth_1.default)(), Comment_controller_1.CommentController.deleteComment);
exports.commentRoutes = router;
