import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createLoginActivity = async (activity: any) => {
  const result = await prisma.loginActivity.create({
    data: {
      email: activity.email!,
      loginAt: activity.loginAt!,
      device: activity.device!,
    },
  });
  return result;
};

const getAllLoginActivities = async () => {
  const activities = await prisma.loginActivity.findMany();
  return activities;
};

export const loginActivityServices = {
  createLoginActivity,
  getAllLoginActivities,
};
