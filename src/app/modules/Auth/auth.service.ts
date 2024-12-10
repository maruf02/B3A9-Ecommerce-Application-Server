import { PrismaClient } from "@prisma/client";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!userData) {
      throw new AppError(StatusCodes.NOT_FOUND, "Email not found");
    }

    if (userData.isBlock === "Yes") {
      throw new AppError(StatusCodes.FORBIDDEN, "Your account is blocked");
    }

    if (userData.isDeleted) {
      throw new AppError(StatusCodes.GONE, "Your account is deleted");
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
      payload.password,
      userData.password
    );

    if (!isCorrectPassword) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Password incorrect");
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
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || "An error occurred during login"
    );
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
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password incorrect!");
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
