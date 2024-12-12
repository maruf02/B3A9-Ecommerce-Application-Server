import { Router } from "express";
import { ReplyCommentController } from "./ReplyComment.controller";

const router = Router();

// Route to create a reply to a comment
router.post("/replyComments", ReplyCommentController.createReplyComment);

// Route to get all replies for a comment
router.get(
  "/replyComments/:commentId",
  ReplyCommentController.getRepliesByCommentId
);

// Route to get a single reply by its ID
router.get(
  "/replyCommentsById/:replyCommentId",
  ReplyCommentController.getReplyById
);

// Route to update a reply comment
router.put(
  "/replyComments/:replyCommentId",
  ReplyCommentController.updateReplyComment
);

// Route to delete a reply comment
router.delete(
  "/replyComments/:replyCommentId",
  ReplyCommentController.deleteReplyComment
);

export const replyCommentRoutes = router;
