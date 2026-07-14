import { DashboardRepository } from "./dashboard.repository";
import logger from "../../utils/logger";

const dashboardRepository = new DashboardRepository();

export const getDashboardMetricsService = async (filters: any) => {
  try {
    return await dashboardRepository.findMany(filters);
  } catch (error: any) {
    logger.error("Dashboard Service - GetMetrics", { message: error.message });
    throw error;
  }
};