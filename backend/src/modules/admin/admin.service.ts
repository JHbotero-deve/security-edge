import * as repository from "./admin.repository.js";
import logger from "../../utils/logger.js";

export async function getDashboardStatsService() {
  try {
    return await repository.getDashboardStatsRepository();
  } catch (error) {
    logger.error("Admin Service - Dashboard", { message: error.message });
    throw error;
  }
}

export async function getAuditLogsService(filters) {
  try {
    return await repository.getAuditLogsRepository(filters);
  } catch (error) {
    logger.error("Admin Service - Audit Logs", { message: error.message });
    throw error;
  }
}

export async function getSecurityEventsService(filters) {
  try {
    return await repository.getSecurityEventsRepository(filters);
  } catch (error) {
    logger.error("Admin Service - Security Events", { message: error.message });
    throw error;
  }
}
