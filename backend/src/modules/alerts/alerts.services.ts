import { findAllRepository, findByIdRepository } from "./alerts.repository";
import logger from "../../utils/logger";

export const getAllAlertsService = async () => {
  try {
    return await findAllRepository();
  } catch (error: any) {
    logger.error("Alerts Service - FindAll", { message: error.message });
    throw error;
  }
};

export const getAlertByIdService = async (id: string) => {
  try {
    return await findByIdRepository(id);
  } catch (error: any) {
    logger.error("Alerts Service - FindById", { message: error.message, id });
    throw error;
  }
};
