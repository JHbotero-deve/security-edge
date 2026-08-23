import { Request, Response, NextFunction } from "express";
import { NotificationService } from "./notifications.services.js";
import { createNotificationSchema, getNotificationByIdSchema, updateNotificationStatusSchema, getNotificationsFilterSchema } from "./notifications.validation.js";


export class NotificationController {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  getMyNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      const { query } = getNotificationsFilterSchema.parse({ query: req.query });
      const data = await this.service.getNotificationsByUser(user.id, query);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = createNotificationSchema.parse({ body: req.body });
      const data = await this.service.sendNotification(body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      const { params, body } = updateNotificationStatusSchema.parse({ params: req.params, body: req.body });
      const data = await this.service.markAsRead(params.id, user.id, body.read);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as any).user;
      const { params } = getNotificationByIdSchema.parse({ params: req.params });
      await this.service.deleteNotification(params.id, user.id);
      res.status(200).json({ success: true, message: "Notificación eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  };
}
