import { Request, Response } from "express";
import sendResponse from "../../helpers/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../helpers/cacheAsync";
import { CommentService } from "./Comment.service";

// Controller to create a comment
const createComment = catchAsync(async (req: Request, res: Response) => {
  const commentData = req.body;
  const result = await CommentService.createComment(commentData);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

// Controller to get all comments
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllComments();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

// Controller to get a comment by ID
const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await CommentService.getCommentById(commentId);

  if (!result || result.isDeleted) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Comment not found",
      data: result,
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment retrieved successfully",
    data: result,
  });
});

// Controller to update a comment
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const updateData = req.body;
  const result = await CommentService.updateComment(commentId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

// Controller to delete a comment
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  await CommentService.deleteComment(commentId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment deleted successfully",
    data: null,
  });
});

const getCommentsByProductId = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    const comments = await CommentService.getCommentsByProductId(productId);

    if (!comments || comments.length === 0) {
      sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "No comments found for this product",
        data: [],
      });
      return;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Comments retrieved successfully",
      data: comments,
    });
  }
);

export const CommentController = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByProductId,
};
