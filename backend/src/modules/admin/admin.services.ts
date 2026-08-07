import { AdminRepository } from "./admin.repository.js";
import logger from "../../utils/logger.js";

export class AdminService {
  private repository: AdminRepository;

  constructor() {
    this.repository = new AdminRepository();
  }

  async getDashboardStats() {
    try {
      return await this.repository.getDashboardStats();
    } catch (error: any) {
      logger.error("Admin Service - Dashboard", { message: error.message });
      throw error;
    }
  }

  async getAuditLogs(filters: Record<string, unknown>) {
    try {
      return await this.repository.getAuditLogs(filters);
    } catch (error: any) {
      logger.error("Admin Service - Audit Logs", { message: error.message });
      throw error;
    }
  }

  async getSecurityEvents(filters: Record<string, unknown>) {
    try {
      return await this.repository.getSecurityEvents(filters);
    } catch (error: any) {
      logger.error("Admin Service - Security Events", { message: error.message });
      throw error;
    }
  }
}
