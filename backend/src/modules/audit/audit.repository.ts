import { BaseRepository } from "../../shared/base.repository";
import { prisma } from "../../lib/prisma";

export class audit.repository extends BaseRepository {
  constructor() {
    super(prisma.auditLog);
  }
}
