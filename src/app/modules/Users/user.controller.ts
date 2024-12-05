import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const result = await userService.createUser(userData);
    res.status(201).send({
      success: true,
      status: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      status: 400,
      message: error.message || "Failed to create user",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.status(200).send({
    success: true,
    status: 200,
    message: "Users retrieved successfully",
    data: result,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userService.getUserById(userId);
  if (!result || result.isDeleted) {
    res.status(404).send({
      success: false,
      status: 404,
      message: "User not found",
    });
    return;
  }
  res.status(200).send({
    success: true,
    status: 200,
    message: "User retrieved successfully",
    data: result,
  });
};

const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await userService.getUserByEmail(email);
  if (!result || result.isDeleted) {
    res.status(404).send({
      success: false,
      status: 404,
      message: "User not found",
    });
    return;
  }
  res.status(200).send({
    success: true,
    status: 200,
    message: "User retrieved successfully",
    data: result,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updateData = req.body;
  const result = await userService.updateUser(userId, updateData);
  res.status(200).send({
    success: true,
    status: 200,
    message: "User updated successfully",
    data: result,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);
  res.status(200).send({
    success: true,
    status: 200,
    message: "User successfully deleted",
  });
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
