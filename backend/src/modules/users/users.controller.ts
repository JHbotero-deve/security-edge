import { Request, Response, NextFunction } from "express";
import * as userService from "./users.service";
import { createUserSchema, updateUserSchema } from "./users.validation";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await userService.getUsersService();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await userService.getUserByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};import { Request, Response, NextFunction } from "express";
import * as users.services from "./users.services";
import { createUserSchema, updateUserSchema } from "./users.validation";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await users.Services.getUsersService();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await userService.getUserByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};