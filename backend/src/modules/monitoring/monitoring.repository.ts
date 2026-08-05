import { BaseRepository } from "../../shared/base.repository.js";
import { prisma } from "../../lib/prisma.js";

export class MonitoringRepository extends BaseRepository {
  constructor() {
    super(prisma.monitoring);
  }
}
