import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.services.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = registerSchema.parse(req.body);
      const result = await this.service.register(data);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await this.service.login(data);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
