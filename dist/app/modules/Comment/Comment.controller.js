"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const Comment_service_1 = require("./Comment.service");
// Controller to create a comment
const createComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = req.body;
    const result = yield Comment_service_1.CommentService.createComment(commentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Comment created successfully",
        data: result,
    });
}));
// Controller to get all comments
const getAllComments = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Comment_service_1.CommentService.getAllComments();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comments retrieved successfully",
        data: result,
    });
}));
// Controller to get a comment by ID
const getCommentById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const result = yield Comment_service_1.CommentService.getCommentById(commentId);
    if (!result || result.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Comment not found",
            data: result,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comment retrieved successfully",
        data: result,
    });
}));
// Controller to update a comment
const updateComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const updateData = req.body;
    const result = yield Comment_service_1.CommentService.updateComment(commentId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comment updated successfully",
        data: result,
    });
}));
// Controller to delete a comment
const deleteComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    yield Comment_service_1.CommentService.deleteComment(commentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comment deleted successfully",
        data: null,
    });
}));
const getCommentsByProductId = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const comments = yield Comment_service_1.CommentService.getCommentsByProductId(productId);
    if (!comments || comments.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "No comments found for this product",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Comments retrieved successfully",
        data: comments,
    });
}));
exports.CommentController = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentsByProductId,
};
