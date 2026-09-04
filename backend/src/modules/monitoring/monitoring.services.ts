import { MonitoringRepository } from "./monitoring.repository.js";
import { AppError } from "../../utils/errors.js";

export class MonitoringService {
  private repository: MonitoringRepository;

  constructor() {
    this.repository = new MonitoringRepository();
  }

  async getMetrics(filters: any) {
    const { type, status, startDate, endDate, page, limit } = filters;
    const where: any = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repository.findManyPaged({ where, skip, take: limit }),
      this.repository.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getMetricById(id: number) {
    const metric = await this.repository.findById(id);
    if (!metric) {
      throw new AppError("Métrica de monitoreo no encontrada", 404);
    }
    return metric;
  }
}
