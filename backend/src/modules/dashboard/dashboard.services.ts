import { DashboardRepository } from "./dashboard.repository.js";
import logger from "../../utils/logger.js";

const dashboardRepository = new DashboardRepository();

export const getDashboardMetricsService = async (filters: Record<string, unknown> = {}) => {
  try {
    return await dashboardRepository.findMany(filters);
  } catch (error: any) {
    logger.error("Dashboard Service - GetMetrics", { message: error.message });
    throw error;
  }
};
