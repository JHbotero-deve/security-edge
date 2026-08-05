import { AuditRepository } from "./audit.repository.js";
import logger from "../../utils/logger.js";

const auditRepository = new AuditRepository();

export const getAuditLogsService = async (filters: Record<string, unknown> = {}) => {
  try {
    return await auditRepository.findMany(filters);
  } catch (error: any) {
    logger.error("Audit Service - GetAuditLogs", { message: error.message });
    throw error;
  }
};
