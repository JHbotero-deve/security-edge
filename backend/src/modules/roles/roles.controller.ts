import { Request, Response, NextFunction } from "express";
import { RoleService } from "./roles.services";
import { createRoleSchema, updateRoleSchema, getRoleByIdSchema } from "./roles.validation";

export class RoleController {
  private service: RoleService;

  constructor() {
    this.service = new RoleService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllRoles();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getRoleByIdSchema.parse({ params: req.params });
      const data = await this.service.getRoleById(parsed.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createRoleSchema.parse({ body: req.body });
      const data = await this.service.createRole(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateRoleSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.updateRole(parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getRoleByIdSchema.parse({ params: req.params });
      await this.service.deleteRole(parsed.params.id);
      res.status(200).json({ success: true, message: "Role deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}