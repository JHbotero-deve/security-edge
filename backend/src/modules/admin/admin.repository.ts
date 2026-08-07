import { prisma } from "../../lib/prisma.js";

export class AdminRepository {
  async getDashboardStats() {
    return await prisma.dashboardMetric.findMany();
  }

  async getAuditLogs(filters: Record<string, unknown>) {
    return await prisma.auditLog.findMany({ where: filters });
  }

  async getSecurityEvents(filters: Record<string, unknown>) {
    return await prisma.incident.findMany({ where: filters });
  }
}
