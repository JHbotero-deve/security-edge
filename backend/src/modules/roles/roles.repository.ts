import { BaseRepository } from "../../shared/base.repository";
import { prisma } from "../../lib/prisma";

export class RoleRepository extends BaseRepository {
  constructor() {
    super(prisma.role);
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