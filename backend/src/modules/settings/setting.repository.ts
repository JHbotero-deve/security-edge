import { BaseRepository } from "../../repositories/base.repository";
import { prisma } from "../../lib/prisma";

export class SettingRepository extends BaseRepository {
  constructor() {
    super(prisma.setting);
  }

  async findById(id: number) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findByKey(key: string) {
    return await this.model.findUnique({
      where: { key },
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