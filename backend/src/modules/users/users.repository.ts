import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class userRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
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
