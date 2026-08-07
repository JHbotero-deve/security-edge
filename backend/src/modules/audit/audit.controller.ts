import { Request, Response, NextFunction } from "express";
import { AuditService } from "./audit.services.js";
import { auditLogFilterSchema } from "./audit.validation.js";

export class AuditController {
  private service: AuditService;

  constructor() {
    this.service = new AuditService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = auditLogFilterSchema.parse(req.query);
      const data = await this.service.getAuditLogs(filters);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
