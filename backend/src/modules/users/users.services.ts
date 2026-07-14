import { UserRepository } from "./users.repository";
import logger from "../../utils/logger";

const userRepository = new UserRepository();

export const getUsersService = async () => {
  try {
    return await userRepository.findMany();
  } catch (error: any) {
    logger.error("User Service - GetAll", { message: error.message });
    throw error;
  }
};

export const getUserByIdService = async (id: string) => {
  try {
    return await userRepository.findById(id);
  } catch (error: any) {
    logger.error("User Service - FindById", { message: error.message, id });
    throw error;
  }
};