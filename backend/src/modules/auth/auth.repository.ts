import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class AuthRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }
}import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class AuthRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }
}