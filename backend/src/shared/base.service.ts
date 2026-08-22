import { BaseRepository } from "./base.repository.js";
import { AppError } from "../utils/errors.js";

export abstract class BaseService<T extends { id: number }> {
  constructor(protected repository: BaseRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<T> {
    const item = await this.repository.findById(id);
    if (!item) throw new AppError("Not found", 404);
    return item;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new AppError("Not found", 404);
      return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new AppError("Not found", 404);
    await this.repository.delete(id);
  }
}
