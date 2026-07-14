import { IncidentRepository } from "./incidents.repository";
import logger from "../../utils/logger";

const incidentRepository = new IncidentRepository();

export const getIncidentsService = async () => {
  try {
    return await incidentRepository.findMany();
  } catch (error: any) {
    logger.error("Incident Service - GetAll", { message: error.message });
    throw error;
  }
};

export const getIncidentByIdService = async (id: string) => {
  try {
    return await incidentRepository.findById(id);
  } catch (error: any) {
    logger.error("Incident Service - FindById", { message: error.message, id });
    throw error;
  }
};

export const createIncidentService = async (data: any) => {
  try {
    return await incidentRepository.create(data);
  } catch (error: any) {
    logger.error("Incident Service - Create", { message: error.message });
    throw error;
  }
};
