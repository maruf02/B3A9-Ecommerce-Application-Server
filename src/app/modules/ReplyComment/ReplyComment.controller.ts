import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { ReplyCommentService } from "./ReplyComment.service";

// Controller to create a reply comment
const createReplyComment = catchAsync(async (req: Request, res: Response) => {
  const replyCommentData = req.body;

  const result = await ReplyCommentService.createReplyComment(replyCommentData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Reply comment created successfully",
    data: result,
  });
});

// Controller to get replies by commentId
const getRepliesByCommentId = catchAsync(
  async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const replies = await ReplyCommentService.getRepliesByCommentId(commentId);

    if (!replies || replies.length === 0) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "No replies found for this comment",
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Replies retrieved successfully",
      data: replies,
    });
  }
);

// Controller to get a single reply by its ID
const getReplyById = catchAsync(async (req: Request, res: Response) => {
  const { replyCommentId } = req.params;

  const reply = await ReplyCommentService.getReplyById(replyCommentId);

  if (!reply || reply.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Reply comment not found",
      data: null,
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reply comment retrieved successfully",
    data: reply,
  });
});

// Controller to update a reply comment
const updateReplyComment = catchAsync(async (req: Request, res: Response) => {
  const { replyCommentId } = req.params;
  const updateData = req.body;

  const result = await ReplyCommentService.updateReplyComment(
    replyCommentId,
    updateData
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reply comment updated successfully",
    data: result,
  });
});

// Controller to delete a reply comment
const deleteReplyComment = catchAsync(async (req: Request, res: Response) => {
  const { replyCommentId } = req.params;

  const result = await ReplyCommentService.deleteReplyComment(replyCommentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Reply comment deleted successfully",
    data: null,
  });
});

export const ReplyCommentController = {
  createReplyComment,
  getRepliesByCommentId,
  getReplyById,
  updateReplyComment,
  deleteReplyComment,
};
