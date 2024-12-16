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
exports.CommentService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, userEmail, userName, productId, vendorId, comment, rating } = commentData;
    return yield prisma.comment.create({
        data: {
            userId,
            userEmail,
            userName,
            productId,
            vendorId,
            comment,
            rating,
        },
    });
});
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.comment.findMany({
        where: { isDeleted: false },
    });
});
const getCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.comment.findUnique({
        where: { commentId },
    });
});
const updateComment = (commentId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.comment.update({
        where: { commentId },
        data: updateData,
    });
});
const deleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.comment.update({
        where: { commentId },
        data: { isDeleted: true },
    });
});
const getCommentsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.comment.findMany({
        where: {
            productId,
            isDeleted: false,
        },
    });
});
exports.CommentService = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
    getCommentsByProductId,
};
