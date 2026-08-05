import { Request, Response, NextFunction } from "express";
import * as dashboardservices from "./dashboard.services.js";
import { dashboardFilterSchema } from "./dashboard.validation.js";

export const getDashboardMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = dashboardFilterSchema.parse(req.query);
    const data = await dashboardservices.getDashboardMetricsService(filters);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};
