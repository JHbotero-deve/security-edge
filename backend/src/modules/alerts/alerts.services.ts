import { AlertRepository } from "./alerts.repository.js";
import logger from "../../utils/logger.js";

export class AlertService {
  private repository: AlertRepository;

  constructor() {
    this.repository = new AlertRepository();
  }

  async getAllAlerts() {
    try {
      return await this.repository.findAll();
    } catch (error: any) {
      logger.error("Alerts Service - FindAll", { message: error.message });
      throw error;
    }
  }

  async getAlertById(id: number) {
    try {
      const alert = await this.repository.findById(id);
      if (!alert) {
        throw new Error("Alert not found");
      }
      return alert;
    } catch (error: any) {
      logger.error("Alerts Service - FindById", { message: error.message, id });
      throw error;
    }
  }
}
