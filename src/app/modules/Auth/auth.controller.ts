import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // Set to `true` in production with HTTPS
      httpOnly: true,
    });

    res.status(200).send({
      success: true,
      status: 200,
      message: "Logged in successfully!",
      data: {
        accessToken: result.accessToken,
      },
    });
  } catch (error: any) {
    if (error.message === "Email not found") {
      res.status(404).send({
        success: false,
        status: 404,
        message: "Email incorrect",
      });
    } else if (error.message === "Password incorrect") {
      res.status(401).send({
        success: false,
        status: 401,
        message: "Password not match",
      });
    } else {
      res.status(500).send({
        success: false,
        status: 500,
        message: "Internal server error",
      });
    }
  }
};

const changePassword = async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user;
    console.log(user);
    const result = await AuthServices.changePassword(user, req.body);

    res.status(500).send({
      success: true,
      message: "Password Changed successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.message === "Password incorrect!") {
      res.status(401).send({
        success: false,
        status: 401,
        message: "Password incorrect",
      });
    }
  }
};

export const AuthController = {
  loginUser,
  changePassword,
};
