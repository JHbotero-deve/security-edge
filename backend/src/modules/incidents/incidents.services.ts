import { IncidentRepository } from "./incidents.repository.js";
import { AppError } from "../../utils/errors.js";

export class IncidentService {
  private repository: IncidentRepository;

  constructor() {
    this.repository = new IncidentRepository();
  }

  async getAllIncidents(filters: any) {
    const { status, severity, search, page, limit } = filters;
    const where: any = {};

    if (status) where.status = status;
    if (severity) where.severity = severity;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

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

  async getIncidentById(id: number) {
    const incident = await this.repository.findById(id);
    if (!incident) {
      throw new AppError("Incidente no encontrado", 404);
    }
    return incident;
  }

  async createIncident(data: any) {
    return await this.repository.create(data);
  }

  async updateIncident(id: number, data: any) {
    await this.getIncidentById(id);
    return await this.repository.update(id, data);
  }

  async deleteIncident(id: number) {
    await this.getIncidentById(id);
    return await this.repository.delete(id);
  }
}

