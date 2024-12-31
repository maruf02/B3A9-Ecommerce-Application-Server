import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEmail = async (EmailData: any) => {
  return await prisma.Email.create({
    data: EmailData,
  });
};

const getAllEmails = async () => {
  const result = await prisma.Email.findMany({
    where: { isDeleted: false },
  });
  return result;
};
export const EmailService = {
  createEmail,
  getAllEmails,
};
