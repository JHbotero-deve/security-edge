import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class MonitoringRepository extends BaseRepository {
  constructor() {
    super(prisma.systemMetric);
  }
}
