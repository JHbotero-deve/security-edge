import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.services.ts";
import { loginSchema, registerSchema } from "./auth.validation.ts";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.registerService(data);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.loginService(data);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
