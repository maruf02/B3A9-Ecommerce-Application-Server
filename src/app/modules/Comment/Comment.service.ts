import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createComment = async (commentData: any) => {
  const { userId, userEmail, userName, productId, vendorId, comment, rating } =
    commentData;

  return await prisma.comment.create({
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
};

const getAllComments = async () => {
  return await prisma.comment.findMany({
    where: { isDeleted: false },
  });
};

const getCommentById = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: { commentId },
  });
};

const updateComment = async (commentId: string, updateData: any) => {
  return await prisma.comment.update({
    where: { commentId },
    data: updateData,
  });
};

const deleteComment = async (commentId: string) => {
  return await prisma.comment.update({
    where: { commentId },
    data: { isDeleted: true },
  });
};

const getCommentsByProductId = async (productId: string) => {
  return await prisma.comment.findMany({
    where: {
      productId,
      isDeleted: false,
    },
  });
};

export const CommentService = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByProductId,
};
