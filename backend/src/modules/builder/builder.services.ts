import { ProjectRepository } from "./builder.repository.js";
import { AppError } from "../../utils/errors.js";

export class ProjectService {
  private repository: ProjectRepository;

  constructor() {
    this.repository = new ProjectRepository();
  }

  async getAllProjects(userId: number, filters: any) {
    const { page, limit } = filters;
    const where: any = { userId };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repository.findManyPaged({ where, skip, take: limit }),
      this.repository.count(where),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProjectById(userId: number, id: number) {
    const project = await this.repository.findById(id);
    if (!project || project.userId !== userId) {
      throw new AppError("Proyecto no encontrado", 404);
    }
    return project;
  }

  async createProject(userId: number, data: any) {
    return await this.repository.create({ ...data, userId });
  }

  async updateProject(userId: number, id: number, data: any) {
    await this.getProjectById(userId, id);
    return await this.repository.update(id, data);
  }

  async deleteProject(userId: number, id: number) {
    await this.getProjectById(userId, id);
    return await this.repository.delete(id);
  }
}
