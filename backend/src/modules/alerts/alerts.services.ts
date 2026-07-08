import { findAllRepository, findByIdRepository } from "./alerts.repository.js";
import logger from "../../utils/logger.js";

export async function getAllAlertsService() {
  try {
    return await findAllRepository();
  } catch (error) {
    logger.error("Alerts Service - FindAll", { message: error.message });
    throw error;
  }
}

export async function getAlertByIdService(id) {
  try {
    return await findByIdRepository(id);
  } catch (error) {
    logger.error("Alerts Service - FindById", { message: error.message, id });
    throw error;
  }
}
