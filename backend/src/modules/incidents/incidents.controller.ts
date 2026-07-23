import { Request, Response, NextFunction } from "express";
import { IncidentService } from "./incidents.services";
import { createIncidentSchema, updateIncidentSchema, getIncidentByIdSchema } from "./incidents.validation";

export class IncidentController {
  private service: IncidentService;

  constructor() {
    this.service = new IncidentService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllIncidents();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getIncidentByIdSchema.parse({ params: req.params });
      const data = await this.service.getIncidentById(parsed.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createIncidentSchema.parse({ body: req.body });
      const data = await this.service.createIncident(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateIncidentSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.updateIncident(parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getIncidentByIdSchema.parse({ params: req.params });
      await this.service.deleteIncident(parsed.params.id);
      res.status(200).json({ success: true, message: "Incident deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}