import * as repository from "./admin.repository.ts";
import logger from "../../utils/logger";

export const getDashboardStatsService = async () => {
  try {
    return await repository.getDashboardStatsRepository();
  } catch (error: any) {
    logger.error("Admin Service - Dashboard", { message: error.message });
    throw error;
  }
};

export async function getAuditLogsService(filters: Record<string, unknown>) {
  try {
    return await repository.getAuditLogsRepository(filters);
  } catch (error: any) {
    logger.error("Admin Service - Audit Logs", { message: error.message });
    throw error;
  }
}

export const getSecurityEventsService = async (filters: Record<string, unknown>) => {
  try {
    return await repository.getSecurityEventsRepository(filters);
  } catch (error: any) {
    logger.error("Admin Service - Security Events", { message: error.message });
    throw error;
  }
};import * as repository from "./admin.repository";
import logger from "../../utils/logger";

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