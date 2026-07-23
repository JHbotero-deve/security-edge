import { BaseRepository } from "../../repositories/base.repository";
import { prisma } from "../../lib/prisma";

export class NotificationRepository extends BaseRepository {
  constructor() {
    super(prisma.notification);
  }

  async findById(id: number) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number) {
    return await this.model.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: number, data: any) {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await this.model.delete({
      where: { id },
    });
  }
}