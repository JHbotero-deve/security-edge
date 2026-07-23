import { BaseRepository } from "../../repositories/base.repository.ts";
import { prisma } from "../../lib/prisma";

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