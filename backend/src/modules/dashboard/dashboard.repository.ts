import { BaseRepository } from "../../repositories/baseRepository";
import { prisma } from "../../lib/prisma";

export class DashboardRepository extends BaseRepository {
  constructor() {
    super(prisma.metrics);
  }
}
