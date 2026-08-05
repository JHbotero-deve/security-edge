import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class PermissionRepository extends BaseRepository {
  constructor() {
    super(prisma.permission);
  }
}
