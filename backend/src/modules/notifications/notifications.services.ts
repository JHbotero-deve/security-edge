import { NotificationRepository } from "./notifications.repository";

export class NotificationService {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  async getNotificationsByUser(userId: number) {
    return await this.repository.findByUserId(userId);
  }

  async sendNotification(data: { userId: number; title: string; message: string }) {
    return await this.repository.create(data);
  }

  async markAsRead(id: number, read: boolean) {
    const notification = await this.repository.findById(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    return await this.repository.update(id, { read });
  }

  async deleteNotification(id: number) {
    const notification = await this.repository.findById(id);
    if (!notification) {
      throw new Error("Notification not found");
    }
    return await this.repository.delete(id);
  }
}