import { BaseRepository } from "../../repositories/base.repository";
import { prisma } from "../../lib/prisma";

export class PermissionRepository extends BaseRepository {
  constructor() {
    // Nombre exacto del modelo en el cliente de Prisma: 'permission'
    super(prisma.permission);
  }

  async findById(id: number) {
    return await this.model.findUnique({
      where: { id },
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