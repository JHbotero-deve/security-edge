import { Request, Response, NextFunction } from "express";
import * as auditService from "./audit.services.ts";
import { auditLogFilterSchema } from "./audit.validation.ts";

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = auditLogFilterSchema.parse(req.query);
    const data = await auditService.getAuditLogsService(filters);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    next(error);
  }
};
