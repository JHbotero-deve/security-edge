import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class RoleRepository extends BaseRepository {
  constructor() {
    super(prisma.role);
  }
}
