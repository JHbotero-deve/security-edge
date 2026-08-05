import * as repository from "./admin.repository.js";
import logger from "../../utils/logger.js";

export const getDashboardStatsService = async () => {
  try {
    return await repository.getDashboardStatsRepository();
  } catch (error: any) {
    logger.error("Admin Service - Dashboard", { message: error.message });
    throw error;
  }
};

export const getAuditLogsService = async (filters: Record<string, unknown>) => {
  try {
    return await repository.getAuditLogsRepository(filters);
  } catch (error: any) {
    logger.error("Admin Service - Audit Logs", { message: error.message });
    throw error;
  }
};

export const getSecurityEventsService = async (filters: Record<string, unknown>) => {
  try {
    return await repository.getSecurityEventsRepository(filters);
  } catch (error: any) {
    logger.error("Admin Service - Security Events", { message: error.message });
    throw error;
  }
};
