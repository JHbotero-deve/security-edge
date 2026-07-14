import { AuditRepository } from "./audit.repository.ts";
import logger from "../../utils/logger";

const auditRepository = new AuditRepository();

export const getAuditLogsService = async (filters: any) => {
  try {
    return await auditRepository.findMany(filters);
  } catch (error: any) {
    logger.error("Audit Service - GetAuditLogs", { message: error.message });
    throw error;
  }
};
