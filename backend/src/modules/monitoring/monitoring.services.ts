import { MonitoringRepository } from "./monitoring.repository";
import logger from "../../utils/logger";

const monitoringRepository = new MonitoringRepository();

export const getSystemMetricsService = async (filters: any) => {
  try {
    return await monitoringRepository.findMany(filters);
  } catch (error: any) {
    logger.error("Monitoring Service - GetMetrics", { message: error.message });
    throw error;
  }
};
