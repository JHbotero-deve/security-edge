import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }
}