import { prisma } from "../../lib/prisma";

export const getDashboardStatsRepository = async () => {
  return await prisma.stats.findMany();
};

export const getAuditLogsRepository = async (filters: Record<string, unknown>) => {
  return await prisma.auditLogs.findMany({ where: filters });
};

export const getSecurityEventsRepository = async (filters: Record<string, unknown>) => {
  return await prisma.securityEvents.findMany({ where: filters });
};
