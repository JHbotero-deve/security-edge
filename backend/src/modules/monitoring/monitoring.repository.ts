import { BaseRepository } from "../../repositories/base.repository";
import { prisma } from "../../lib/prisma";

export class MonitoringRepository extends BaseRepository {
  constructor() {
    super(prisma.systemMetric);
  }
}
