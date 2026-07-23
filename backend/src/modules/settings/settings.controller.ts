import { Request, Response, NextFunction } from "express";
import { SettingService } from "./settings.services";
import { createSettingSchema, updateSettingSchema, getSettingByKeySchema } from "./settings.validation";

export class SettingController {
  private service: SettingService;

  constructor() {
    this.service = new SettingService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllSettings();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getByKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getSettingByKeySchema.parse({ params: req.params });
      const data = await this.service.getSettingByKey(parsed.params.key);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createSettingSchema.parse({ body: req.body });
      const data = await this.service.createSetting(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateSettingSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.updateSetting(parsed.params.id, parsed.body);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}