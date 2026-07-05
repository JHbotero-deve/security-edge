export class BaseRepository<T> {
  constructor(protected model: any) {}

  async findAll() {
    return await this.model.findMany();
  }

  async create(data: any) {
    return await this.model.create({ data });
  }
}
