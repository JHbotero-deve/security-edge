import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notifications.services";
import { createNotificationSchema, getNotificationByIdSchema, updateNotificationStatusSchema } from "./notifications.validation";

export class NotificationController {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  getByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = parseInt(String(req.params.userId), 10);
      const data = await this.service.getNotificationsByUser(userId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createNotificationSchema.parse({ body: req.body });
      const data = await this.service.sendNotification(parsed.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateNotificationStatusSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.markAsRead(parsed.params.id, parsed.body.read);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = getNotificationByIdSchema.parse({ params: req.params });
      await this.service.deleteNotification(parsed.params.id);
      res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}