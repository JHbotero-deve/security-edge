import { Request, Response, NextFunction } from "express";
import { DashboardService } from "./dashboard.services.js";
import { dashboardFilterSchema } from "./dashboard.validation.js";

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  getMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = dashboardFilterSchema.parse(req.query);
      const data = await this.service.getMetrics(filters);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
