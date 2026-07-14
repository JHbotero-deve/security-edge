import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class AuditRepository extends BaseRepository {
  constructor() {
    super(prisma.auditLog);
  }
}
