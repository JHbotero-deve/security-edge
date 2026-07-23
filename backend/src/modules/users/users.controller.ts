import { Request, Response, NextFunction } from "express";
import { UserService } from "./users.services";
import { createUserSchema, updateUserSchema, getUserByIdSchema } from "./users.validation";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllUsers();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getUserByIdSchema.parse({ params: req.params });
      const data = await this.service.getUserById(parsed.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createUserSchema.parse({ body: req.body });
      const data = await this.service.createUser(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateUserSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.updateUser(parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getUserByIdSchema.parse({ params: req.params });
      await this.service.deleteUser(parsed.params.id);
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}