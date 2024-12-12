import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Service to create a reply comment
const createReplyComment = async (replyCommentData: any) => {
  const {
    commentId,
    userId,
    userEmail,
    userName,
    productId,
    vendorId,
    vendorEmail,
    shopName,
    repliesComment,
  } = replyCommentData;

  return await prisma.replyComment.create({
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
};

// Service to get replies by commentId
const getRepliesByCommentId = async (commentId: string) => {
  return await prisma.replyComment.findMany({
    where: {
      commentId,
      isDeleted: false,
    },
  });
};

// Service to get a reply comment by its ID
const getReplyById = async (replyCommentId: string) => {
  return await prisma.replyComment.findUnique({
    where: { replyCommentId },
  });
};

// Service to update a reply comment
const updateReplyComment = async (replyCommentId: string, updateData: any) => {
  return await prisma.replyComment.update({
    where: { replyCommentId },
    data: updateData,
  });
};

// Service to delete a reply comment
const deleteReplyComment = async (replyCommentId: string) => {
  return await prisma.replyComment.update({
    where: { replyCommentId },
    data: { isDeleted: true },
  });
};

export const ReplyCommentService = {
  createReplyComment,
  getRepliesByCommentId,
  getReplyById,
  updateReplyComment,
  deleteReplyComment,
};
