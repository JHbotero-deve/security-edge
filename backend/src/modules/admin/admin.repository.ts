import { prisma } from "../../lib/prisma.js";

export const getDashboardStatsRepository = async () => {
  return await prisma.dashboardMetric.findMany();
};

export const getAuditLogsRepository = async (filters: Record<string, unknown>) => {
  return await prisma.auditLog.findMany({ where: filters });
};

export const getSecurityEventsRepository = async (filters: Record<string, unknown>) => {
  return await prisma.incident.findMany({ where: filters });
};
