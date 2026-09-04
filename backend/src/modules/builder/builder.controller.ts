import { Request, Response, NextFunction } from "express";
import { ProjectService } from "./builder.services.js";
import { createProjectSchema, updateProjectSchema, getProjectByIdSchema, getProjectsFilterSchema } from "./builder.validation.js";

export class ProjectController {
  private service: ProjectService;

  constructor() {
    this.service = new ProjectService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = getProjectsFilterSchema.parse({ query: req.query });
      const userId = (req as any).user.id;
      const data = await this.service.getAllProjects(userId, query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getProjectByIdSchema.parse({ params: req.params });
      const userId = (req as any).user.id;
      const data = await this.service.getProjectById(userId, parsed.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createProjectSchema.parse({ body: req.body });
      const userId = (req as any).user.id;
      const data = await this.service.createProject(userId, parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateProjectSchema.parse({ params: req.params, body: req.body });
      const userId = (req as any).user.id;
      const data = await this.service.updateProject(userId, parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getProjectByIdSchema.parse({ params: req.params });
      const userId = (req as any).user.id;
      await this.service.deleteProject(userId, parsed.params.id);
      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
