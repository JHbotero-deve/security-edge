import { prisma } from "../../lib/prisma.js";
import logger from "../../utils/logger.js";
import { NotFoundError } from "../../utils/errors.js";

/**
 * Get dashboard statistics
 */
export async function getDashboardStatsService() {
  try {
    const [totalUsers, activeUsers, securityEvents, auditLogs] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({
          where: { status: "ACTIVE" },
        }),
        prisma.securityEvent.count(),
        prisma.auditLog.count(),
      ]);

    const recentEvents = await prisma.securityEvent.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return {
      totalUsers,
      activeUsers,
      totalSecurityEvents: securityEvents,
      totalAuditLogs: auditLogs,
      recentEvents,
    };
  } catch (error) {
    logger.error("Get dashboard stats error", { error: error.message });
    throw error;
  }
}

/**
 * Get audit logs
 */
export async function getAuditLogsService(filters) {
  try {
    const skip = (filters.page - 1) * filters.limit;

    const where = {};
    if (filters.userId) where.userId = filters.userId;
    if (filters.action) where.action = { contains: filters.action };
    if (filters.resource) where.resource = { contains: filters.resource };
    if (filters.status) where.status = filters.status;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: filters.limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { logs, total };
  } catch (error) {
    logger.error("Get audit logs error", { error: error.message });
    throw error;
  }
}

/**
 * Get security events
 */
export async function getSecurityEventsService(filters) {
  try {
    const skip = (filters.page - 1) * filters.limit;

    const where = {};
    if (filters.eventType) where.eventType = filters.eventType;
    if (filters.severity) where.severity = filters.severity;
    if (filters.resolved !== undefined) where.resolved = filters.resolved;

    const [events, total] = await Promise.all([
      prisma.securityEvent.findMany({
        where,
        skip,
        take: filters.limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.securityEvent.count({ where }),
    ]);

    return { events, total };
  } catch (error) {
    logger.error("Get security events error", { error: error.message });
    throw error;
  }
}