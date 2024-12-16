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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyCommentService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Service to create a reply comment
const createReplyComment = (replyCommentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId, userEmail, userName, productId, vendorId, vendorEmail, shopName, repliesComment, } = replyCommentData;
    return yield prisma.replyComment.create({
        data: {
            commentId,
            userId,
            userEmail,
            userName,
            productId,
            vendorId,
            vendorEmail,
            shopName,
            repliesComment,
        },
    });
});
// Service to get replies by commentId
const getRepliesByCommentId = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.replyComment.findMany({
        where: {
            commentId,
            isDeleted: false,
        },
    });
});
// Service to get a reply comment by its ID
const getReplyById = (replyCommentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.replyComment.findUnique({
        where: { replyCommentId },
    });
});
// Service to update a reply comment
const updateReplyComment = (replyCommentId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.replyComment.update({
        where: { replyCommentId },
        data: updateData,
    });
});
// Service to delete a reply comment
const deleteReplyComment = (replyCommentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.replyComment.update({
        where: { replyCommentId },
        data: { isDeleted: true },
    });
});
exports.ReplyCommentService = {
    createReplyComment,
    getRepliesByCommentId,
    getReplyById,
    updateReplyComment,
    deleteReplyComment,
};
