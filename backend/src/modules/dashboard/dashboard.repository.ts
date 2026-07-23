import { BaseRepository } from "../../repositories/base.repository";
import { prisma } from "../../lib/prisma";

export class DashboardRepository extends BaseRepository {
  constructor() {
    super(prisma.metrics);
  }
};