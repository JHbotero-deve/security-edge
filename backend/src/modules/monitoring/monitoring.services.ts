import { MonitoringRepository } from "./monitoring.repository.js";

export class MonitoringService {
  private repository: MonitoringRepository;

  constructor() {
    this.repository = new MonitoringRepository();
  }

  async getMetrics(filters: Record<string, unknown> = {}) {
    return await this.repository.findMany(filters);
  }

  async getMetricById(id: number) {
    const metric = await this.repository.findById(id);
    if (!metric) {
      throw new Error("Metric not found");
    }
    return metric;
  }
}
