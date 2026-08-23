import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class AuditRepository extends BaseRepository {
  constructor() {
    super(prisma.auditLog);
  }
}
