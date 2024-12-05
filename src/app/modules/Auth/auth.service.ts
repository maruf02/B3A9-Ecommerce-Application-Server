import { PrismaClient } from "@prisma/client";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!userData) {
      throw new Error("Email not found");
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
      payload.password,
      userData.password
    );

    if (!isCorrectPassword) {
      throw new Error("Password incorrect");
    }

    const accessToken = jwtHelpers.generateToken(
      {
        userId: userData.userId,
        email: userData.email,
        role: userData.role,
      },
      config.jwt_access_secret as Secret,
      "10d"
    );

    const refreshToken = jwtHelpers.generateToken(
      {
        email: userData.email,
        role: userData.role,
      },
      config.jwt_refresh_secret as Secret,
      "365d"
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during login");
  }
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
};
