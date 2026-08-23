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
      const { body } = registerSchema.parse({ body: req.body });
      const result = await this.service.register(body);
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
      const { body } = loginSchema.parse({ body: req.body });
      const result = await this.service.login(body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      const result = await this.service.getProfile(user.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

}
