import { Router } from "express";
import auth from "../../middlewares/auth";
import { CommentController } from "./Comment.controller";

const router = Router();

// Routes for comments
router.post("/comments", auth(), CommentController.createComment);
router.get("/comments", CommentController.getAllComments);
router.get("/comments/:commentId", CommentController.getCommentById);
router.get(
  "/commentsGetByProductId/:productId",
  CommentController.getCommentsByProductId
);
router.put("/comments/:commentId", auth(), CommentController.updateComment);
router.delete("/comments/:commentId", auth(), CommentController.deleteComment);

export const commentRoutes = router;
