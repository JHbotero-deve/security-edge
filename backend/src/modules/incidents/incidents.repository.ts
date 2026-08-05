import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class IncidentRepository extends BaseRepository {
  constructor() {
    super(prisma.incident);
  }

  async findById(id: number) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Record<string, unknown>) {
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
