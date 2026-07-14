import { Request, Response, NextFunction } from "express";
import * as services from "./admin.services.ts";
import { auditLogFilterSchema, securityEventFilterSchema } from "./admin.validation.ts";

export const getDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await services.getDashboardStatsService();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = auditLogFilterSchema.parse(req.query);
    const data = await services.getAuditLogsService(filters);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getSecurityEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = securityEventFilterSchema.parse(req.query);
    const data = await services.getSecurityEventsService(filters);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
