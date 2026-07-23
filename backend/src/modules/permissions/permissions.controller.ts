import { Request, Response, NextFunction } from "express";
import { PermissionService } from "./permissions.services";
import { createPermissionSchema, updatePermissionSchema, getPermissionByIdSchema } from "./permissions.validation";

export class PermissionController {
  private service: PermissionService;

  constructor() {
    this.service = new PermissionService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllPermissions();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getPermissionByIdSchema.parse({ params: req.params });
      const data = await this.service.getPermissionById(parsed.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createPermissionSchema.parse({ body: req.body });
      const data = await this.service.createPermission(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updatePermissionSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.updatePermission(parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getPermissionByIdSchema.parse({ params: req.params });
      await this.service.deletePermission(parsed.params.id);
      res.status(200).json({ success: true, message: "Permission deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}