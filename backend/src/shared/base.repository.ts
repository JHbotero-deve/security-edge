export class BaseRepository<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findOne(where: Record<string, any>): Promise<T | null> {
    return this.model.findFirst({ where });
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Record<string, any>): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: number, data: Record<string, any>): Promise<T | null> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
