import { Request, Response, NextFunction } from "express";
import { MonitoringService } from "./monitoring.services.js";
import { getMonitoringFilterSchema, getMonitoringByIdSchema } from "./monitoring.validation.js";

export class MonitoringController {
  private service: MonitoringService;

  constructor() {
    this.service = new MonitoringService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = getMonitoringFilterSchema.parse({ query: req.query });
      const data = await this.service.getMetrics(query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params } = getMonitoringByIdSchema.parse({ params: req.params });
      const data = await this.service.getMetricById(params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}
