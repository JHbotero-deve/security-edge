import { NotificationRepository } from "./notifications.repository.js";
import { AppError } from "../../utils/errors.js";

export class NotificationService {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  async getNotificationsByUser(userId: number, filters: any) {
    const { read, page, limit } = filters;
    const where: any = { userId };

    if (read !== undefined) {
      where.read = read === "true";
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repository.findManyPaged({ where, skip, take: limit }),
      this.repository.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async sendNotification(data: { userId: number; title: string; message: string }) {
    return await this.repository.create(data);
  }

  async markAsRead(id: number, userId: number, read: boolean) {
    const notification = await this.repository.findById(id);
    if (!notification) {
      throw new AppError("Notificación no encontrada", 404);
    }

    if ((notification as any).userId !== userId) {
      throw new AppError("No tienes permiso para modificar esta notificación", 403);
    }

    return await this.repository.update(id, { read });
  }

  async deleteNotification(id: number, userId: number) {
    const notification = await this.repository.findById(id);
    if (!notification) {
      throw new AppError("Notificación no encontrada", 404);
    }

    if ((notification as any).userId !== userId) {
      throw new AppError("No tienes permiso para eliminar esta notificación", 403);
    }

    return await this.repository.delete(id);
  }
}
