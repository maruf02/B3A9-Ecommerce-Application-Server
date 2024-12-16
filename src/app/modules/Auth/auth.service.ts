import { PrismaClient } from "@prisma/client";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import * as bcrypt from "bcrypt";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import emailSender from "./emailSender";

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

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      // status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.reset_pass_secret as Secret,
    config.reset_pass_token_expires_in as string
  );
  //console.log(resetPassToken)

  const resetPassLink =
    config.reset_pass_link +
    `?userId=${userData.userId}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
  );
  //console.log(resetPassLink)
};

const resetPassword = async (payload: {
  token: string;
  userId: string;
  password: string;
}) => {
  const { token, userId, password } = payload;

  console.log({ payload });

  // Verify the token
  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.reset_pass_secret as Secret
  );

  if (!isValidToken) {
    throw new AppError(StatusCodes.FORBIDDEN, "Invalid or expired token!");
  }
  console.log("isValidToken", isValidToken);

  // Fetch the user using userId
  const userData = await prisma.user.findUniqueOrThrow({
    where: { userId },
  });

  if (!userData) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }
  console.log("userData", userData);

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Update the user's password in the database
  await prisma.user.update({
    where: { userId },
    data: { password: hashedPassword },
  });

  console.log("Password successfully updated!");
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
