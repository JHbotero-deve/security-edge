import { role.repository } from "./roles.repository";

export class RoleService {
  private repository: role.repository;

  constructor() {
    this.repository = new role.repository();
  }

  async getAllRoles() {
    return await this.repository.findAll();
  }

  async getRoleById(id: number) {
    const role = await this.repository.findById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async createRole(data: { name: string }) {
    return await this.repository.create(data);
  }

  async updateRole(id: number, data: { name: string }) {
    await this.getRoleById(id);
    return await this.repository.update(id, data);
  }

  async deleteRole(id: number) {
    await this.getRoleById(id);
    return await this.repository.delete(id);
  }
}