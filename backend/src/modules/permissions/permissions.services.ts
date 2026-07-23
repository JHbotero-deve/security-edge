import { PermissionRepository } from "./permissions.repository";

export class PermissionService {
  private repository: PermissionRepository;

  constructor() {
    this.repository = new PermissionRepository();
  }

  async getAllPermissions() {
    return await this.repository.findAll();
  }

  async getPermissionById(id: number) {
    const permission = await this.repository.findById(id);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }

  async createPermission(data: { name: string }) {
    return await this.repository.create(data);
  }

  async updatePermission(id: number, data: { name: string }) {
    await this.getPermissionById(id);
    return await this.repository.update(id, data);
  }

  async deletePermission(id: number) {
    await this.getPermissionById(id);
    return await this.repository.delete(id);
  }
}