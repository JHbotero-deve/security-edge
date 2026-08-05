import { Request, Response, NextFunction } from "express";
import { MonitoringService } from "./monitoring.services.js";
import { monitoringFilterSchema } from "./monitoring.validation.js";

export class MonitoringController {
  private service: MonitoringService;

  constructor() {
    this.service = new MonitoringService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = monitoringFilterSchema.parse(req.query);
      const data = await this.service.getMetrics(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = parseInt(String(req.params.id), 10);
      const data = await this.service.getMetricById(id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}
