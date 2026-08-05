import { userRepository } from "./users.repository.js";

export class UserService {
  private repository: userRepository;

  constructor() {
    this.repository = new userRepository();
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

  async createUser(data: { username: string; email: string }) {
    return await this.repository.create(data);
  }

  async updateUser(id: number, data: { username?: string | undefined; email?: string | undefined }) {
    await this.getUserById(id);
    return await this.repository.update(id, data);
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    return await this.repository.delete(id);
  }
}
