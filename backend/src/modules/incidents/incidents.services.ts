import { IncidentRepository } from "./incidents.repository.js";

export class IncidentService {
  private repository: IncidentRepository;

  constructor() {
    this.repository = new IncidentRepository();
  }

  async getAllIncidents() {
    return await this.repository.findAll();
  }

  async getIncidentById(id: number) {
    const incident = await this.repository.findById(id);
    if (!incident) {
      throw new Error("Incident not found");
    }
    return incident;
  }

  async createIncident(data: { title: string; description: string; status?: string | undefined; severity?: string | undefined }) {
    return await this.repository.create(data);
  }

  async updateIncident(id: number, data: { title?: string | undefined; description?: string | undefined; status?: string | undefined; severity?: string | undefined }) {
    await this.getIncidentById(id);
    return await this.repository.update(id, data);
  }

  async deleteIncident(id: number) {
    await this.getIncidentById(id);
    return await this.repository.delete(id);
  }
}
