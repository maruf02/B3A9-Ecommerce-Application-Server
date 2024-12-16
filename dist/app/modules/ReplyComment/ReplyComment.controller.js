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
exports.ReplyCommentController = void 0;
const sendResponse_1 = __importDefault(require("../../helpers/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const cacheAsync_1 = __importDefault(require("../../helpers/cacheAsync"));
const ReplyComment_service_1 = require("./ReplyComment.service");
// Controller to create a reply comment
const createReplyComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const replyCommentData = req.body;
    const result = yield ReplyComment_service_1.ReplyCommentService.createReplyComment(replyCommentData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "Reply comment created successfully",
        data: result,
    });
}));
// Controller to get replies by commentId
const getRepliesByCommentId = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    const replies = yield ReplyComment_service_1.ReplyCommentService.getRepliesByCommentId(commentId);
    if (!replies || replies.length === 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "No replies found for this comment",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Replies retrieved successfully",
        data: replies,
    });
}));
// Controller to get a single reply by its ID
const getReplyById = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { replyCommentId } = req.params;
    const reply = yield ReplyComment_service_1.ReplyCommentService.getReplyById(replyCommentId);
    if (!reply || reply.isDeleted) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            success: false,
            message: "Reply comment not found",
            data: null,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Reply comment retrieved successfully",
        data: reply,
    });
}));
// Controller to update a reply comment
const updateReplyComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { replyCommentId } = req.params;
    const updateData = req.body;
    const result = yield ReplyComment_service_1.ReplyCommentService.updateReplyComment(replyCommentId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Reply comment updated successfully",
        data: result,
    });
}));
// Controller to delete a reply comment
const deleteReplyComment = (0, cacheAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { replyCommentId } = req.params;
    const result = yield ReplyComment_service_1.ReplyCommentService.deleteReplyComment(replyCommentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Reply comment deleted successfully",
        data: null,
    });
}));
exports.ReplyCommentController = {
    createReplyComment,
    getRepliesByCommentId,
    getReplyById,
    updateReplyComment,
    deleteReplyComment,
};
