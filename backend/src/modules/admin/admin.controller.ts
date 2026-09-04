import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.services.js";
import { auditLogFilterSchema, securityEventFilterSchema } from "./admin.validation.js";

export class AdminController {
  private service: AdminService;

  constructor() {
    this.service = new AdminService();
  }

  getDashboard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getDashboardStats();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getAuditLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = auditLogFilterSchema.parse(req.query);
      const data = await this.service.getAuditLogs(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getSecurityEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters = securityEventFilterSchema.parse(req.query);
      const data = await this.service.getSecurityEvents(filters);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}
