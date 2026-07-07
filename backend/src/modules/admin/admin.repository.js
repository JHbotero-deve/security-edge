import { prisma } from "../../lib/prisma.js";

export async function getDashboardStatsRepository() {
  return await prisma.stats.findMany();
}

export async function getAuditLogsRepository(filters) {
  return await prisma.auditLogs.findMany({ where: filters });
}

export async function getSecurityEventsRepository(filters) {
  return await prisma.securityEvents.findMany({ where: filters });
}
