import { UserRepository } from "./users.repository.js";
import bcrypt from "bcrypt";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers() {
    return await this.repository.findAll();
  }

  async getUserById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async createUser(data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await this.repository.create(data);
  }

  async updateUser(id: number, data: any) {
    await this.getUserById(id);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await this.repository.update(id, data);
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    return await this.repository.delete(id);
  }
}
