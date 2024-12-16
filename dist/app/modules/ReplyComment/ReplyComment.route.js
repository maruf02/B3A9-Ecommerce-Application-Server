"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyCommentRoutes = void 0;
const express_1 = require("express");
const ReplyComment_controller_1 = require("./ReplyComment.controller");
const router = (0, express_1.Router)();
// Route to create a reply to a comment
router.post("/replyComments", ReplyComment_controller_1.ReplyCommentController.createReplyComment);
// Route to get all replies for a comment
router.get("/replyComments/:commentId", ReplyComment_controller_1.ReplyCommentController.getRepliesByCommentId);
// Route to get a single reply by its ID
router.get("/replyCommentsById/:replyCommentId", ReplyComment_controller_1.ReplyCommentController.getReplyById);
// Route to update a reply comment
router.put("/replyComments/:replyCommentId", ReplyComment_controller_1.ReplyCommentController.updateReplyComment);
// Route to delete a reply comment
router.delete("/replyComments/:replyCommentId", ReplyComment_controller_1.ReplyCommentController.deleteReplyComment);
exports.replyCommentRoutes = router;
