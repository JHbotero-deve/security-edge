import { DashboardRepository } from "./dashboard.repository.js";

export class DashboardService {
  private repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  async getMetrics(filters: Record<string, unknown> = {}) {
    return await this.repository.findMany(filters);
  }
}
