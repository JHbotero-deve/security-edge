import { Request, Response, NextFunction } from "express";
import { AlertService } from "./alerts.services.js";
import { alertIdSchema } from "./alerts.validation.js";

export class AlertController {
  private service: AlertService;

  constructor() {
    this.service = new AlertService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllAlerts();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { params } = alertIdSchema.parse({ params: req.params });
      const data = await this.service.getAlertById(params.id);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
