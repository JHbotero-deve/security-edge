import { UserRepository } from "../../repositories/UserRepository";

const userRepo = new UserRepository();

export class UserService {
  async getAllUsers() {
    return await userRepo.findAll();
  }
}
