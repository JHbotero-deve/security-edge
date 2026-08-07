import { AuditRepository } from "./audit.repository.js";

export class AuditService {
  private repository: AuditRepository;

  constructor() {
    this.repository = new AuditRepository();
  }

  async getAuditLogs(filters: Record<string, unknown> = {}) {
    return await this.repository.findMany(filters);
  }

  async createAuditLog(data: any) {
    return await this.repository.create(data);
  }
}
