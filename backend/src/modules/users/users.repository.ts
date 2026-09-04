import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.usuario);
  }

  async count(where: any) {
    return await this.model.count({ where });
  }

  async findManyPaged(args: { where: any; skip: number; take: number }) {
    return await this.model.findMany({
      where: args.where,
      skip: args.skip,
      take: args.take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  }
}

