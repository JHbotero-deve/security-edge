import { incidents.repository } from "./incidents.repository";
export class IncidentService {
  private repository: incidents.repository;

  constructor() {
    this.repository = new incidents.repository();
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

  async createIncident(data: { title: string; description: string; status?: string; severity?: string }) {
    return await this.repository.create(data);
  }

  async updateIncident(id: number, data: { title?: string; description?: string; status?: string; severity?: string }) {
    await this.getIncidentById(id);
    return await this.repository.update(id, data);
  }

  async deleteIncident(id: number) {
    await this.getIncidentById(id);
    return await this.repository.delete(id);
  }
}