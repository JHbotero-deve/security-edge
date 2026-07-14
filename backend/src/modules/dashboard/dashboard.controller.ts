import { Request, Response, NextFunction } from "express";
import * as dashboardservices from "./dashboard.services.ts";
import { dashboardFilterSchema } from "./dashboard.validation.ts";

export const getDashboardMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = dashboardFilterSchema.parse(req.query);
    const data = await dashboardService.getDashboardMetricsService(filters);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};import { Request, Response, NextFunction } from "express";
import * as dashboardService from "./dashboard.service";
import { dashboardFilterSchema } from "./dashboard.validation";

export const getDashboardMetrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = dashboardFilterSchema.parse(req.query);
    const data = await dashboardService.getDashboardMetricsService(filters);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};
