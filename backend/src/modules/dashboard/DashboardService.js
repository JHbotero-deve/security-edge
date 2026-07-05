import { AuditRepository } from "../../repositories/AuditRepository";

const auditRepo = new AuditRepository();

export class DashboardService {
  async getSummary() {
    const logs = await auditRepo.findAll();
    return { totalEvents: logs.length, recent: logs.slice(0, 5) };
  }
}
