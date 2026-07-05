import { BaseRepository } from "../../repositories/baseRepository.ts";
import { prisma } from "../../lib/prisma";

export class AuditRepository extends BaseRepository {
  constructor() {
    super(prisma.auditLog); // Asumiendo que tu modelo se llama AuditLog
  }
}
